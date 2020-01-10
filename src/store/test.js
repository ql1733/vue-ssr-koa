import { getHomeAll } from '../api/home.js'

const state = {
  myLists: []
}
const actions = {
  getMyList({ commit }) {
    return getHomeAll('/topics', {
      method: 'get',
      page: 1,
      tab: 'good',
      limit: 10,
      mdrender: false
    }).then(res => {
      // this.list = res.data.data
      commit('setList', res.data.data)
    })
  }
}
const mutations = {
  setList(state, value) {
    state.myLists = value
  }
}
export default {
  state,
  mutations,
  actions
}
