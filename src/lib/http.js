import axios from 'axios'

const reqMap = {}
export function newInstance() {
  const http = axios.create()
  http.reqMap = {}
  http.interceptors.request.use((config) => {
    return config
  }, (err) => {
    return Promise.reject(err)
  })
  http.interceptors.response.use((res) => {
    let data = res.data
    if (typeof data === 'string') {
      data = JSON.parse(data.replace(/\\/g, ''))
    }
    return res
  }, (err) => {
    return Promise.reject(err)
  })
  return http
}

export function fetch(http, config, url, data) {
  const method = data.method || 'get'
  if (method === 'get') {
    const newData = {}
    for (const i in data) {
      if (i !== 'method') {
        newData[i] = data[i]
      }
    }
    data = {
      params: newData
    }
  }
  const key = `${url}${JSON.stringify(data)}`
  if (http.reqMap[key]) {
    return Promise.reject(new Error('request repeat'))
  }
  reqMap[key] = 1
  return http[method](config.baseURL + url, data, config).then(res => {
    delete reqMap[key]
    return res
  }, (err) => {
    delete reqMap[key]
    return err
  })
}
