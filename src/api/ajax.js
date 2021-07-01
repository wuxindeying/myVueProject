/* 
axios二次封装
1. 配置通用的基础路径和超时
2. 显示请求进度条
3. 成功返回的数据不再是response, 而直接是响应体数据response.data
4. 统一处理请求错误, 具体请求也可以选择处理或不处理
*/
import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'

/* 1. 配置通用的基础路径和超时 */
// service是一个能发任意ajax请求的函数, 当然可以作为对象使用
const service= axios.create({
  baseURL: '/api',//基础路径
  timeout: 2000,//超时时间
})

// 添加请求拦截器
service.interceptors.request.use((config) => {
  /* 2. 显示请求进度条 */
  // 显示请求进度条: 在请求拦截器中
  NProgress.start()
  
  //携带临时标识
  let userTempId = store.state.user.userTempId
  if (userTempId) {
    config.headers.userTempId=userTempId
  }

  //携带登录后标识token
  let token =store.state.user.token
  if (token) {
    config.headers.token=token
  }

  // 必须返回config
  return config // 后面就会根据返回的config, 使用xhr对象发ajax请求
})

// 添加响应拦截器
service.interceptors.response.use(
  response => { // 请求成功返回的回调
    // 隐藏请求进度条: 在响应拦截器成功的回调中
    NProgress.done()
    // return response

    /* 3. 成功返回的数据不再是response, 而直接是响应体数据response.data */
    return response.data
  },
  error => { // 请求失败返回的回调
    // 隐藏请求进度条: 在响应拦截器失败的回调中
    NProgress.done()

    /* 4. 统一处理请求错误, 具体请求也可以选择处理或不处理 */
    alert(error.message || '未知的请求错误')

    // return error // 不能这么写
    // throw error
    return Promise.reject(error)
  }
)

// 向外暴露 service
export default service





//对axios二次封装的理解:

/* 
//使用二次封装的axios发送请求:
service.get('/xxx')
//在get内部发生二次封装的一系列操作(中间的详细过程在下面)
...
//最后得到二次封装处理后的结果
.then(
  result=>{},//接收响应拦截器成功回调返回的结果
  error=>{}//接收响应拦截器失败回调返回的结果
)//或者通过.catch捕捉error

//当使用二次封装的axios发送请求时,内部发生下面代码:
//一开始产生一个参数为config的成功promise,用于后续进行链式操作
Promise.resolve(config)

//请求拦截器处理
.then((config) => {  
  //请求拦截器处理
  ...
  return config        //接收原config, 返回拦截器处理后的config, 得到参数为config的成功promise
})
  
//真正发送异步ajax请求 
.then((config)=>{     
  return (new Promise((resolve,reject)=>{       //根据请求的成败返回一个成功或者失败的promise
    //根据config使用xhr发送ajax请求
    ...
    //如果成功了,创建response对象
    resolve(response)
    //如果失败了,创建error对象
    reject(error)
  }))
})

//响应拦截器处理
.then(
  (response)=>{  //响应拦截器成功的回调
    return  response.data                     //返回response.data,得到参数为data的成功promise
  },
  (error)=>{     //响应拦截器失败的回调
    throw error                               //抛出error,得到参数为error的失败promise
)
 */