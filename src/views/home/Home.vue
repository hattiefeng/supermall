<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control v-show="isFixed" ref="tabControl1" class="tab-control" @tabClick="tabClick" :titles="['流行','新款','推荐']"/>
    <scroll  class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"/>
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
       ref="tabControl2"
       @tabClick="tabClick"
       :titles="['流行','新款','推荐']"/>
      <goods-list :goodslist="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="showBack"/>

  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper"
  import RecommendView from "./childComps/RecommendView"
  import FeatureView from "./childComps/FeatureView"

  import NavBar from "components/common/navbar/NavBar"
  import TabControl from "components/content/tabControl/TabControl"
  import GoodsList from "components/content/goods/GoodsList"
  import Scroll from "components/common/scroll/Scroll"
  

  import { getHomeMutidata, getHomeGoods } from "network/home"
  import {debounce} from "common/utils"
  import {itemListenerMixin, backUpMixin} from "common/mixin"


  export default {
    name: "home",
    components:{
      HomeSwiper,
      RecommendView,
      FeatureView,

      NavBar,
      TabControl,
      GoodsList,
      Scroll
    },
    mixins:[itemListenerMixin, backUpMixin],
    data(){
      return {
        banners: [],
        recommends: [],
        goods:{
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        
        tabOffsetTop: 0,
        isFixed: false,
        saveY: 0
      }
    },

    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },

    created(){
      //请求多个数据
      this.getHomeMutidata();

      //请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },

    mounted(){

    },

    activated(){
      this.$refs.scroll.scrollTo(0, this.saveY, 0);
      this.$refs.scroll.refresh();
    },

    deactivated(){
      this.saveY = this.$refs.scroll.getScrollY();
      this.$bus.$off('itemImgLoad', this.itemImgListener);
    },
    methods:{

      //防抖
      debounce(func, delay){
        let timer = null
        if (timer) clearTimeout(timer)
        return function(...args){
          timer = setTimeout(()=>{
            func.apply(this, args)
          },delay)
        }
      },

      //点击tabControl 数据切换
      //数据切换
      tabClick(index){
        switch (index){
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        // 不论点击哪个tabControl,两个tabControl都一样变化
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },


      contentScroll(position){
        //展示回到顶部
        this.showBack = (-position.y) > 1000
        //显示吸顶效果
        this.isFixed = (-position.y) > this.tabOffsetTop
      },
      //加载更多
      loadMore(){
        this.getHomeGoods(this.currentType);
      },

      swiperImgLoad(){
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },
      //网络请求相关
      getHomeMutidata(){
        getHomeMutidata().then(res => {
          // console.log(res);
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1;
        getHomeGoods(type,page).then(res => {
          this.goods[type].list.push(...res.data.list);
          // console.log(res.data.list);
          this.goods[type].page +=1;

          //完成上拉加载更多
          this.$refs.scroll.finishPullUp();
        })
      }
    }
  }
</script>

<style scoped>
  #home{
    /* 当前屏幕可见高度100%,没有内容时也会被撑开 */
    height: 100vh;

    /* padding-top: 44px; */
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /* 用了better-scroll后就不需要fixed了,此区域不在滚动范围内 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
