/* 
所有路由匹配的数组
*/
// import Home from '../pages/Home'
const Home = () => import('../pages/Home')
// import Search from '../pages/Search'
const Search = () => import('../pages/Search')

import Register from '@/pages/Register'
import Login from '@/pages/Login'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/MyOrder'
import GroupOrder from '@/pages/Center/GroupOrder'

import store from '@/store'

//import from 这样的写法
//一个是同步引入，从上往下依次执行引入
//它不能动态引入
//它是把所有的组件全部引入完成才执行下面代码，webpack打包的时候会把所有的引入组件集体打包，打包成一个大文件
//这样效率比较慢

//import函数可以让路由组件单独打包   还支付动态引入
//写法很简单，路由组件在注册的时候可以是一个组件也可以是一个函数
//写成函数，当路由被访问的时候，对应的函数就会调用，然后对应的import函数才会执行 动态引入并打包成单独文件




//浏览器在运行的时候  加载 解析  渲染

export default [
  {
    path: '/',
    component:Home
  },
  {
    name:'search',
    path: '/search/:keyword?',/* 设置 ? ,params参数可传可不传 */
    component: Search,
    //props: true,//布尔模式传递props:将所有的params参数映射成props(缺点是只能映射params参数,不能query参数)
    props:(route)=>({keyword3:route.params.keyword,keyword4:route.query.keyword2})//函数模式传递props:函数接收当前路由信息对象,返回一个对象,对象内所有属性自动传入props
  },
  {
    name:'register',
    path: '/register',
    component: Register,
    meta: {
      isHideFooter: true//配置组件&route中的meta属性,在App中使用v-show控制Footer组件是否展示
    },
  },
  {
    path: '/login',
    component: Login,
    meta: {
      isHideFooter:true//配置组件&route中的meta属性,在App中使用v-show控制Footer组件是否展示
    },
    //配置一个路由独享守卫
    beforeEnter: (to, from, next) => {
      // 只有没登录才能看到登录的界面
      let token = store.state.user.token
      if (token) {
        next('/')   //既然登陆过,就别再去登录页面了,转为主页面
      } else {
        next()      //没登录过,就放行可以正常跳转登录页面
      }
    }
  },
  {
    name:'detail',
    path: '/detail/:skuId',
    component: Detail,
  },
  {
    name: 'addcartsuccess',
    path: '/addcartsuccess',
    component: AddCartSuccess,
    //配置一个路由独享守卫
    beforeEnter: (to, from, next) => {
      // 只有没登录才能看到登录的界面
      let skuNum = to.query.skuNum
      let skuInfo = sessionStorage.getItem('SKUINFO_KEY')
      if (skuNum && skuInfo) {
        next()
      } else {
        alert('必须带够参数')
        next('/')
      }
    },
  },
  {
    name:'shopcart',
    path: '/shopcart',
    component: ShopCart,
  },
  {
    name:'trade',
    path: '/trade',
    component: Trade,
    //配置一个路由独享守卫
    beforeEnter: (to, from, next) => {
      // 只有没登录才能看到登录的界面
      if (from.path=='/shopcart') {
        next()    //只有从购物车界面,才能跳转到交易页面
      } else {
        next('/')
      }
    },
  },
  {
    name:'pay',
    path: '/pay',
    component: Pay,
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      if(from.path === '/trade'){
        next()
      }else{
        next('/')
      }
    }
  },
  {
    name:'paySuccess',
    path: '/paySuccess',
    component: PaySuccess,
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      if(from.path === '/pay'){
        next()
      }else{
        next('/')
      }
    }
  },
  {
    name:'center',
    path: '/center',
    redirect:'/center/myorder',   //自动跳转到myorder
    component: Center,
    children: [
      {
        name:'myorder',
        path: 'myorder',
        component: MyOrder,
      },
      {
        name:'grouporder',
        path: 'grouporder',
        component: GroupOrder,
      },
      /* {
        path: '',
        redirect:'myorder'   //写一个默认的二级路由,进入/center后自动重定向到'myorder'
      } */
    ]
  },
]
