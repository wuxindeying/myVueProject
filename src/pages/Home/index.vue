<template>
  <div>
    <TypeNav/><!-- 该组件在main.js中全局注册 -->
    <!-- <type-nav/>这是另一种引入方式,效果同上 -->
    <list-container/><!-- ListContainer和TodayRecommend等组件局部注册 -->
    <TodayRecommend/>
    <Rank/>
    <Like/>
    <Floor v-for="(floorItem, index) in floors" :key="floorItem.id" :floorItem="floorItem"/>
    <Brand/>
  </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer'
import TodayRecommend from '@/pages/Home/TodayRecommend'
import Rank from './Rank/Rank.vue'
import Floor from './Floor/Floor.vue'
import Like from './Like/Like.vue' 
import Brand from './Brand/Brand.vue'
import {mapState} from 'vuex'

export default {
  name: 'Home',

  mounted() {
    this.$store.dispatch('getRecommends')
    this.$store.dispatch('getFloors')
  },
  computed: {
    ...mapState({
      floors:state=>state.home.floors
    })
  },

  //注册局部组件
  components:{
    ListContainer,
    TodayRecommend,
    Rank,
    Floor,
    Like,
    Brand,
  }
}
</script>

<style lang="less" scoped>

</style>
