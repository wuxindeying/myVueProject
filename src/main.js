import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import TypeNav from '@/components/TypeNav'
import MyPagination from '@/components/Pagination'
import './piugins/swiper'    //加载swiper插件配置
import './piugins/element'   //加载element-ui相关的配置
import './piugins/validate'
import './mock/mockServer'

import * as API from '@/api'

import VueLazyload from 'vue-lazyload'
import loading from '@/assets/images/loading.gif'
// 在图片界面没有进入到可视范围前不加载, 在没有得到图片前先显示loading图片
Vue.use(VueLazyload, { // 内部自定义了一个指令lazy
  loading,  // 指定未加载得到图片之前的loading图片
})

//非生产环境打包提示
Vue.config.productionTip = false

//注册全局组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(MyPagination.name, MyPagination)   //注册自己写的分页器组件

//1)创建或指定全局事件总线对象,保存在Vue的原型上
//Vue.prototype.$bus=new Vue()

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this//与Vue.prototype.$bus=new Vue()相比,这样写可以减少一个不必要的对象
    Vue.prototype.$API = API  //当不适用vuex时,可以把接口请求函数全部装在对象API当中,挂在Vue原型上
  },
  render: h => h(App),
  router,//注册路由器==>所有组件都可以直接访问两个对象:$router和$route
  store,//注册vuex ==> 所有组件都可以直接访问一个对象:$store
}).$mount('#app')


/* 
store对象的功能
读取数据:
  store.state.xxx
  store.getters.xxx    读取计算属性数据
更新数据
  store.dispatch(action名称,data)
  store.commit(mutation名称,data)
*/