<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="hideFirstList" @mouseenter="showFirstList">
        <h2 class="all">全部商品分类</h2>
        <transition name="slide">
          <div class="sort" v-show="isShowFirst">
            <div class="all-sort-list2" @click.prevent="toSearch">
              <div class="item" v-for="(categoryitem, index) in categoryList" :key="categoryitem.categoryId"
                :class="{active:currentIndex===index}" @mouseenter="showSubList(index)">
                <h3>
                  <a href="javascript:;" :data-categoryName="categoryitem.categoryName"
                    :data-category1Id="categoryitem.categoryId">{{categoryitem.categoryName}}</a>
                  <!-- <a href="" @click="$router.push(`/search?categoryName=${categoryitem.categoryName}&category1Id=${categoryitem.categoryId}`)">{{categoryitem.categoryName}}</a> -->
                  <!-- <router-link :to="`/search?categoryName=${categoryitem.categoryName}&category1Id=${categoryitem.categoryId}`">{{categoryitem.categoryName}}</router-link> -->
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <dl class="fore" v-for="(childitem, index) in categoryitem.categoryChild"
                      :key="childitem.categoryId">
                      <dt>
                        <a href="javascript:;" :data-categoryName="childitem.categoryName"
                          :data-category2Id="childitem.categoryId">{{childitem.categoryName}}</a>
                        <!-- <a href="" @click="$router.push(`/search?categoryName=${childitem.categoryName}&category2Id=${childitem.categoryId}`)">{{childitem.categoryName}}</a> -->
                        <!-- <router-link :to="`/search?categoryName=${childitem.categoryName}&category2Id=${childitem.categoryId}`">{{childitem.categoryName}}</router-link> -->
                      </dt>
                      <dd>
                        <em v-for="(childchilditem, index) in childitem.categoryChild" :key="childchilditem.categoryId">
                          <a href="javascript:;" :data-categoryName="childchilditem.categoryName"
                            :data-category3Id="childchilditem.categoryId">{{childchilditem.categoryName}}</a>
                          <!-- <a href="" @click="$router.push(`/search?categoryName=${childchilditem.categoryName}&category3Id=${childchilditem.categoryId}`)">{{childchilditem.categoryName}}</a> -->
                          <!-- <router-link :to="`/search?categoryName=${childchilditem.categoryName}&category3Id=${childchilditem.categoryId}`">{{childchilditem.categoryName}}</router-link> -->
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
/* 
1.在App.vue中的mounted周期内dispatch()触发发送请求的异步action调用  ==>  数据从后台接口请求到vuex的state中
2.store.state / mapstate() 读取vuex的state数据 ==> 数据从vuex的state到组件的computed中
3.在模板中动态显示
*/
import {mapState} from 'vuex'
//import _ from 'lodash'
import throttle from 'lodash/throttle'   //lodash按需引入,只引入需要的模块  ==>减小打包文件的大小

  export default {
    name: 'TypeNav',
    data() {
      const path =this.$route.path
      return {
        //isShowFirst:false,//是否显示一级列表
        isShowFirst:path==='/',
        currentIndex:-2,//需要显示子列表的下标
      }
    },

    /* created() { //在created中进行判断是否一级列表显示,不会导致多更新
      //判断当前请求的是否是首页,如果是显示一级列表
      const path =this.$route.path
      if (path==='/') {
      this.isShowFirst=true
      }
    }, */
    /* mounted() {   //在初始显示之后更新数据 ==> 导致界面多更新一次
      //判断当前请求的是否是首页,如果是显示一级列表
      const path =this.$route.path
      if (path==='/') {
        this.isShouFirst=true
      }
    }, */
    computed:{
      //读取vuex中的state数据
        //1.使用store.state方法
      // categoryList(){
      //   return this.$store.state.home.categoryList
      // }
        //2.使用mapstate辅助函数方法
      //...mapState(['categoryList'])//这样缺失home信息->找不到home.categoryList(只能适用于vuex非模块化)
      ...mapState({
        categoryList: state=>state.home.categoryList,   //函数接收总状态state,以返回值作为计算书性质(所需categoryList)
      })
    },
    methods: {
      /* 
      显示一级列表
      */
      showFirstList(){
        //标识当前已经进入包含分类的div了
        this.currentIndex=-1
        //保证显示一级列表
        this.isShowFirst=true
      },
      /* 
      隐藏一级列表
      */
      hideFirstList(){
        //标识当前已经离开包含分类的div了
        this.currentIndex=-2
        //如果当前不是首页,隐藏一级列表
        if (this.$route.path!=='/') {
          this.isShowFirst=false
        }

      },
      /* 
      显示指定下标的子分类列表
      */
      //showSubList:_.throttle(  //将事件回调外包一层_.throttle,使用lodash进行节流,间隔时间200
      showSubList:throttle(   //lodash按需引入后
      //(index)=>{     这里不能写成箭头函数,因为箭头函数没有自己的this,且不能通过bind制定特定的this.所以只能使用function形式
        function(index){       //这个事件监听回调函数触发频率太高,需要进行函数节流
        console.log('throttle',index)
        //只有当还没有离开整个分类的div时才更新下标
        if (this.currentIndex!==-2) {
          this.currentIndex=index
        }
      },200/* ,{
        trailing:false,   //最后一次事件不延迟处理
      } */),

      /* 
      跳转到搜索
      */
      toSearch(event){
        //target拿到对应的标签体,如:<a href data-categoryname="图书、音像、电子书刊" data-category1id="1">图书、音像、电子书刊</a>
        const {target} = event
        //console.dir(target)  //通过console.dir()可以拿到对象形式的标签,发现该标签的所有信息都在target.dataset属性中
        //取出在标签上自定义的用于保存信息的属性
        const {categoryname,category1id,category2id,category3id}=target.dataset   //注意target.dataset中会自动转成小写
        if (categoryname) {  //判断所点击标签是不是categoryList中 
          //准备query参数,如:categoryName=图书、音像、电子书刊&category1Id=1
          const query={
            categoryName:categoryname
          }
          if (category1id) {
            query.category1Id=category1id
          }else if(category2id){
            query.category2Id=category2id
          }else if(category3id){
            query.category3Id=category3id
          }

          //准备一个用于跳转的对象
          const location={
            name:'search',
            query,
            params:this.$route.params, //再次点击时,保留当前已有的params参数
          }

          //跳转到search
          this.$router.push(location)
          //跳转后自动隐藏分类列表
          this.hideFirstList()
        }

    }
    }
  }
</script>

<style lang="less" scoped>
  .type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      position: relative;

      .all {
        width: 210px;
        height: 45px;
        background-color: #e1251b;
        line-height: 45px;
        text-align: center;
        color: #fff;
        font-size: 14px;
        font-weight: bold;
      }

      .nav {
        a {
          height: 45px;
          margin: 0 22px;
          line-height: 45px;
          font-size: 16px;
          color: #333;
        }
      }

      .sort {
        position: absolute;
        left: 0;
        top: 45px;
        width: 210px;
        height: 461px;
        position: absolute;
        background: #fafafa;
        z-index: 999;
        /* 指定过渡的样式 */
        &.slide-enter-active , &.slide-leave-active{   /* vue中的过渡过程中设置 */
          transition: all 0.3s;
        }
        /* 指定隐藏时的样式 */
        &.slide-enter,&.slide-leave-to{
          opacity: 0;/*指定透明度和高度的过渡变化 */
          height: 0;
        }
        .all-sort-list2 {
          .item {
            h3 {
              line-height: 30px;
              font-size: 14px;
              font-weight: 400;
              overflow: hidden;
              padding: 0 20px;
              margin: 0;

              a {
                color: #333;
              }
            }

            .item-list {
              display: none;
              position: absolute;
              width: 734px;
              min-height: 460px;
              background: #f7f7f7;
              left: 210px;
              border: 1px solid #ddd;
              top: 0;
              z-index: 9999 !important;

              .subitem {
                float: left;
                width: 650px;
                padding: 0 4px 0 8px;

                dl {
                  border-top: 1px solid #eee;
                  padding: 6px 0;
                  overflow: hidden;
                  zoom: 1;

                  &.fore {
                    border-top: 0;
                  }

                  dt {
                    float: left;
                    width: 54px;
                    line-height: 22px;
                    text-align: right;
                    padding: 3px 6px 0 0;
                    font-weight: 700;
                  }

                  dd {
                    float: left;
                    width: 415px;
                    padding: 3px 0 0;
                    overflow: hidden;

                    em {
                      float: left;
                      height: 14px;
                      line-height: 14px;
                      padding: 0 8px;
                      margin-top: 5px;
                      border-left: 1px solid #ccc;
                    }
                  }
                }
              }
            }

            &.active {
              background: #ccc;
              .item-list {
                display: block;
              }
            }
          }
        }
      }
    }
  }
</style>
