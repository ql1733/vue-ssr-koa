<template>
  <div>
    Hello {{ world }} {{ text }}
    <p class="red">
      hello world
    </p>
    <p @click="change">
      click me
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: null
    }
  },
  computed: {
    // 从 store 的 state 对象中的获取从API拿到的数据
    world() {
      return this.$store.state.text
    }
  },
  asyncData({ store, route }) {
    // 触发 action 后，会返回 Promise
    return store.dispatch('getList', { route })
  },
  created() {
    this.text = 'SSR'
  },
  methods: {
    change() {
      // this.$store.commit('setValue','go!')
      this.$store.dispatch('fetchVal')
    }
  }
}
</script>
<style>
.red{
    color:red;
}
</style>
