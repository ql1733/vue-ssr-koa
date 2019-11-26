import { newInstance, fetch } from './http.js'
import { httpConfig, defaultConfig } from '../config/index.js'

import { merge } from 'lodash'

const config = merge({}, httpConfig, defaultConfig)

const httpInstance = newInstance()
export function ajax (url, data) {
  return fetch(httpInstance, config, url, data)
}
