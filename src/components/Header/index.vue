<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="$store.state.user.userInfo.name">
            <a href="javascript:;">{{$store.state.user.userInfo.name}}</a>
            <a href="javascript:;" class="register" @click="logout">退出登录</a>
          </p>
          <p v-else>
            <span>请</span>
            <!-- <a href="###">登录</a> -->
            <router-link to="/login">登录</router-link>
            <!-- <a href="###" class="register">免费注册</a> -->
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
        </div>
        <div class="typeList">
          <!-- <a href="###">我的订单</a> -->
          <router-link to="/center">我的订单</router-link>
          <!-- <a href="###">我的购物车</a> -->
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <!-- 声明式导航 -->
        <router-link to="/" class="logo" title="尚品汇" target="_blank">
          <img src="./images/logo.png" alt="">
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model.trim="keyword" />
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="search">搜索</button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'Header',

    data() {
      return {
        keyword: ''
      }
    },
    methods: {
      search() {
        //编程式路由导航
        //this.$router.push(`/search/${this.keyword}`)

        const location={
          name: 'search',//router文件中相应的路由必须有name.这里才能进行匹配
          query:this.$route.query,//将当前就有的query参数携带上
        }
        //只有有数据时,才携带params参数
        if(this.keyword){
          location.params= {
            keyword: this.keyword
          }
          /* location.query={
            keyword2:this.keyword.toUpperCase()
          } */
        }

        /* 
        router.push(location, onComplete?, onAbort?)
        router.push(location).then(onComplete).catch(onAbort)
        */
       this.$router.push(location)
       //解决重复跳转路由的错误(promise未捕捉)(.push()会产生一个promise,当重复跳转时该promise报错)
       //方法一:传入成功的回调函数(此时.push()的结果不再是一个promise,所以就不会再出现promise未捕捉错误)
       //this.$router.push(location,()=>{})
       //方法二:catch处理错误的promise(此时的错误promise被捕捉)
       //this.$router.push(location).catch(()=>{})
       //方法三:修正Vue原型上的push和replace方法,解决重复跳转时报错promise未捕捉的问题,在(router/index.js文件中进行修改)
      },

      async logout(){
        try {
          await this.$store.dispatch('userLogout')
          alert('退出成功')
          this.$router.push('/')
        } catch (error) {
          alert(error.message)
        }
      },
    },
    mounted() {
      //2).在Header组件中绑定自定时事件监听,在回调中清除数据
      this.$bus.$on('clearKeyword',()=>{
        this.keyword=''
      })
    },
    beforeDestroy() {
      this.$bus.off('clearKeyword')
    },
  }
</script>

<style lang="less" scoped>
  .header {
    &>.top {
      background-color: #eaeaea;
      height: 30px;
      line-height: 30px;

      .container {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;

        .loginList {
          float: left;

          p {
            float: left;
            margin-right: 10px;

            .register {
              border-left: 1px solid #b3aeae;
              padding: 0 5px;
              margin-left: 5px;
            }
          }
        }

        .typeList {
          float: right;

          a {
            padding: 0 10px;

            &+a {
              border-left: 1px solid #b3aeae;
            }
          }

        }

      }
    }

    &>.bottom {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .logoArea {
        float: left;

        .logo {
          img {
            width: 175px;
            margin: 25px 45px;
          }
        }
      }

      .searchArea {
        float: right;
        margin-top: 35px;

        .searchForm {
          overflow: hidden;

          input {
            box-sizing: border-box;
            width: 490px;
            height: 32px;
            padding: 0px 4px;
            border: 2px solid #ea4a36;
            float: left;

            &:focus {
              outline: none;
            }
          }

          button {
            height: 32px;
            width: 68px;
            background-color: #ea4a36;
            border: none;
            color: #fff;
            float: left;
            cursor: pointer;

            &:focus {
              outline: none;
            }
          }
        }
      }
    }
  }
</style>