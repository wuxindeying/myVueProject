/* 
管理首相相关数据的vuex子模块
*/
import {reqCategoryList,reqBannerList,reqRecommends,reqFloors} from '@/api'

const state = {    //state存放数据
  categoryList: [],
  bannerList: [],
  recommends: [],
  floors:[],
}
const mutations = {   //mutations接收请求回来的数据,放入state
  /* 
  接收保存分类列表
   */
  RECEIVE_CATEGORY_LIST(state,categoryList) {//state是当前模块的state
    state.categoryList=categoryList.splice(0,15)//页面里放不下全部,所以只取前15个
  },
  /* 
  接收保存广告轮播列表
   */
  RECEIVE_BANNER_LIST(state,bannerList) {
    state.bannerList=bannerList
  },
  /* 
  接收保存MOCK今日推荐列表
   */
  RECEIVE_RECOMMENDS(state,recommends) {
    state.recommends=recommends
  },
  /* 
  接收保存MOCK楼层列表
   */
  RECEIVE_FLOORS(state,floors) {
    state.floors=floors
  },
}
const actions = {     //action异步发送请求
  /* 
  获取三级分类列表的异步action
  */
  async getCategoryList ({ commit }) { //commit触发的是所有匹配的mutation,可能是其他模块或者总的mutation
    //发异步ajax请求(调用接口请求函数)
    const result = await reqCategoryList()
    //如果请求成功了,得到数据提交给mutation
    if (result.code===200) {
      const categoryList = result.data
      commit('RECEIVE_CATEGORY_LIST',categoryList)
    }
  },
  /* 
  获取广告轮播列表的异步action
  */
  async getBannerList ({ commit }) {
    //发异步ajax请求(调用接口请求函数)
    const result = await reqBannerList()
    //如果请求成功了,得到数据提交给mutation
    if (result.code===200) {
      const bannerList = result.data
      commit('RECEIVE_BANNER_LIST',bannerList)
    }
  },
  /* 
  获取今日推荐列表的异步action
  */
  async getRecommends ({ commit }) {
    //发异步ajax请求(调用接口请求函数)
    const result = await reqRecommends()
    //如果请求成功了,得到数据提交给mutation
    if (result.code===200) {
      const recommends = result.data
      commit('RECEIVE_RECOMMENDS',recommends)
    }
  },
  /* 
  获取楼层列表的异步action
  */
  async getFloors ({ commit }) {
    //发异步ajax请求(调用接口请求函数)
    const result = await reqFloors()
    //如果请求成功了,得到数据提交给mutation
    if (result.code===200) {
      const floors = result.data
      commit('RECEIVE_FLOORS',floors)
    }
  }
}
const getters = {}


export default {
  state,
  mutations,
  actions,
  getters
}