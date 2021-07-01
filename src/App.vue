<template>
  <div id="app">
    <Header></Header>
    <!-- 所有的一级路由都在此显示 -->
    <router-view></router-view>
    <Footer v-show="!$route.meta.isHideFooter"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
//import {reqCategoryList} from './api'

export default {
  name: 'App',

  mounted() {
    //异步获取三级分类列表
    /* reqCategoryList().then(
      result=>{console.log('result',result)},
    ) */
    //分发请求获取分类列表的异步action   (getCategoryList的action在vuex的home模块中定义了)
    this.$store.dispatch('getCategoryList'),    //由于App组件只加载一次,将dispatch放在App组件中进行,只获取一次就行.而其他组件则可能重复加载
    this.$store.dispatch('getBannerList')
  },
  components:{
    Header,
    Footer
  }
}
</script>

<style>

</style>
