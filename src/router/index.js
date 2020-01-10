import Vue from 'vue'
import Router from 'vue-router'

import home from '@/views/home'
import List from '@/views/list'
import Ask from '@/views/ask'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      {
        path: '/',
        name: 'Home',
        component: home,
        children: [
          {
            path: 'ask',
            name: 'ask',
            component: Ask
          },
          {
            path: 'good',
            name: 'good',
            component: Ask
          },
          {
            path: 'all',
            name: 'all',
            component: Ask
          },
          {
            path: 'job',
            name: 'job',
            component: Ask
          },
          {
            path: 'share',
            name: 'share',
            component: Ask
          },
          {
            path: 'dev',
            name: 'dev',
            component: Ask
          }
        ]
      },
      {
        path: '/list',
        name: 'List',
        component: List
      },
      { path: '/', redirect: '/ask' }
    ]
  })
}
