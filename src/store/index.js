
import Vue from 'vue'
import Vuex from 'vuex'
import { getHomeAll } from '../api/home.js'
import myInfo from './test'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export function createStore() {
  return new Vuex.Store({
    state: {
      text: '',
      list: []
    },
    actions: {
      fetchVal({ commit }) {
        try {
          // setTimeout(() => {
          //     commit('setValue', 'hello my country')
          // }, 1000);

          commit('setValue', 'hello my country')
        } catch (err) {
          commit('setValue', 'Error')
        }
      },
      getList({ commit }, { route }) {
        return getHomeAll('/topics', {
          method: 'get',
          page: 1,
          tab: route.name,
          limit: 10,
          mdrender: false
        }).then(res => {
          // this.list = res.data.data
          commit('setList', res.data.data)
        })
      }
    },
    mutations: {
      setValue(state, value) {
        state.text = value
      },
      setList(state, value) {
        state.list = value
      }
    },
    modules: {
      myInfo
    },
    strict: debug
  })
}
