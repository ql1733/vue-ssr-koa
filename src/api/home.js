import { ajax } from '../lib/index.js'
// import axios from 'axios'
export function getHomeAll (url, data) {
//   return new Promise((resolve, reject) => {
//     axios.get(url, {
//       params: data
//     }).then(res => {
//       resolve(res)
//     }).catch(err => {
//       reject(err)
//     })
//   })
  return ajax(url, data)
}
