const path = require('path')
const Koa = require('koa')
const fs = require('fs')
const koaCompress = require('koa-compress')
const compressible = require('compressible')
const koaStatic = require('./build/static')
const Router = require('koa-router')
const chalk = require('chalk')
const LRU = require('lru-cache')
const {
  createBundleRenderer
} = require('vue-server-renderer')
const isProd = process.env.NODE_ENV === 'production'
const setUpDevServer = require('./build/setup-dev-server')
const HtmlMinifier = require('html-minifier').minify
const pathResolve = file => path.resolve(__dirname, file)
const app = new Koa()
const router = new Router()


app.use(koaCompress({ // 压缩数据
  filter: type => !(/event\-stream/i.test(type)) && compressible(type) // eslint-disable-line
}))

app.use(koaStatic(isProd ? path.resolve(__dirname, './dist') : path.resolve(__dirname, './public'), {
  maxAge: 30 * 24 * 60 * 60 * 1000
})) // 配置静态资源目录及过期时间


const createRenderer = (bundle, options) => {
  return createBundleRenderer(bundle, Object.assign(options, {
    cache: new LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15
    }),
    basedir: pathResolve('./dist'),
    runInNewContext: false
  }))
}

let renderer = null
if(isProd){
  const template = HtmlMinifier(fs.readFileSync(pathResolve('./public/index.html'), 'utf-8'), {
    collapseWhitespace: true,
    removeAttributeQuotes: true,
    removeComments: false
  })
  const bundle = require(pathResolve('./dist/vue-ssr-server-bundle.json'))
  const clientManifest = require(pathResolve('./dist/vue-ssr-client-manifest.json'))
  renderer = createRenderer(bundle, {
    template,
    clientManifest
  })
}else{
  setUpDevServer(app, (bundle, options, apiMain, apiOutDir) => {
    try {
      renderer = createRenderer(bundle, options)
    } catch (e) {
      // console.log(chalk.red('\nServer error'), e)
    }
  })
}

const render = async (ctx, next) => {
    if (!renderer) {
      ctx.type = 'html'
      ctx.body = 'waiting for compilation... refresh in a moment.'
      next()
      return
    }

    let status = 200
    let html = null
    const context = {
      url: ctx.url,
      title: 'OK'
    }
    if (/^\/api/.test(ctx.url)) { // 如果请求以/api开头，则进入api部分进行处理。
      next()
      return
    }
    try {
      status = 200
      html = await renderer.renderToString(context)
    } catch (e) {
      if (e.message === '404') {
        status = 404
        html = '404 | Not Found'
      } else {
        status = 500
        // console.log(e)
       // console.log(chalk.red('\nError: '), e.message)
        html = '500 | Internal Server Error'
      }
    }
    ctx.type = 'html'
    ctx.status = status || ctx.status
    ctx.body = html
    next()
}

router.get('*', render)

app
  .use(router.routes())
  .use(router.allowedMethods())



const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(chalk.green(`server started at localhost:${port}`))
})

