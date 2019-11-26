<template>
    <div class="z-wrap">
       
        <ul class="z-content">
            <li v-for="(item, index) in lists" :key="index">
                
                <img :src="item.author.avatar_url" />
                <span>{{item.reply_count}}/{{item.visit_count}}</span>
                <span v-show="item.tab==='all'||item.tab==='good'" :class="item.tab=='good'?'btn-color':''">{{getTabName(item.tab)}}</span>
                <span>{{item.content.length>30?item.content.substring(0,30)+'...':item.content}}</span>
                <img :src="item.author.avatar_url" />
                <span>{{item.last_reply_at}}</span>
            </li>
        </ul>
        
    </div>
</template>
<script>
import { getHomeAll } from '../api/home.js'
export default {
    data () {
        return {
            
        }
    },
     asyncData ({ store, route }) {
    // 触发 action 后，会返回 Promise
      //return store.dispatch('fetchVal', route.params.id)
      return store.dispatch('getList', {route})
       
    },
    computed: {
        lists () {
            return this.$store.state.list
        }
    },
    methods: {
        getTabName (item) {
            switch (item) {
                case 'all':
                    return '全部'
                case 'good':
                    return '精华'
                case 'ask':
                    return '问答'
                case 'job':
                    return '招聘'
                case 'share':
                    return '分享'
                case 'dev':
                    return '客户端测试'
            }
        }
    },
    mounted () {
        console.log(this.lists)
    }
}
</script>
<style lang="less">
.z-wrap{
    margin: 20px;
    .z-content{
        li{
            height: 60px;
            line-height: 60px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            img:nth-of-type(1){
                width: 30px;
                height: 30px;
                
            }
            img:nth-of-type(2){
                width: 30px;
                height: 30px;
                margin: 0 30px;
            }
            span{
                display:inline-block;
            }
            span:nth-of-type(1){
                margin: 0 30px;
                width: 100px;
            }
            span:nth-of-type(2){
                width: 40px;
            }
            span:nth-of-type(3){
                width: 500px;
            }
        }
    }
}
</style>