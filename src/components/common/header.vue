<template>
    <div class="z-header">
        <div>
            <img src=""/>
            <input />
        </div>
        <div>
            <span>首页</span>
            <span>新手入门</span>
            <span>API</span>
            <span>注册</span>
            <span>登录</span>
            <router-link to="/ask">ask</router-link>
            <router-link to="/good">good</router-link>
            <router-link to="/dev">dev</router-link>
            <router-link to="/share">share</router-link>
            <router-link to="/all">all</router-link>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {}
    }
}
</script>
<style lang="less">
    .z-header{
        height:80px;
        display:flex;
    }
</style>