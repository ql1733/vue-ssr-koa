import { devConfig } from './dev.js'
import { prodConfig } from './prod.js'
export const httpConfig = {
  withCredentials: true,
  timeout: 1000 * 60
}
export const defaultConfig = (process.env.NODE_ENV === 'production' ? prodConfig : devConfig)
