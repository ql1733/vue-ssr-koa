
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export function createStore () {
  return new Vuex.Store({
    state: {
      text: ''
    },
    actions: {
      fetchVal ({ commit }) {
        try {
          // setTimeout(() => {
          //     commit('setValue', 'hello my country')
          // }, 1000);

          commit('setValue', 'hello my country')
        } catch (err) {
          commit('setValue', 'Error')
        }
      }
    },
    mutations: {
      setValue (state, value) {
        state.text = value
      }
    },
    strict: debug
  })
}
