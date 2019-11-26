<template>
  <div>
    <Header>
     </Header>
    <router-view></router-view>

  </div>
</template>

<script>
// import axios from 'axios'
import { getHomeAll } from '../api/home.js'
import Header from '../components/common/header.vue'
export default {
  data () {
    return {
      text: null
    }
  },
  asyncData ({ store, route }) {
    // 触发 action 后，会返回 Promise
    return store.dispatch('fetchVal', route.params.id)
  },
  computed: {
    // 从 store 的 state 对象中的获取从API拿到的数据
    world () {
      return this.$store.state.text
    }
  },
  components: {
    Header
  },
  created () {
    // this.text = 'SSR'
    //   getHomeAll('/topics', {
    //   method: 'get',
    //   page: 1,
    //   tab: 'ask',
    //   limit: 10,
    //   mdrender: false
    // }).then(res => {
    //   console.log(res)
    // })
  }
}
</script>
