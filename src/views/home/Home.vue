<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <scroll  class="content" ref="scroll">
      <home-swiper :banners="banners" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control class="tab-control" @tabClick="tabClick" :titles="['流行','新款','推荐']"/>
      <goods-list :goodslist="showGoods"/>
    </scroll>
    <back-top @click.native="backClick"/>

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
  import BackTop from "components/content/backTop/BackTop"

  import { getHomeMutidata, getHomeGoods } from "network/home"


  export default {
    name: "home",
    components:{
      HomeSwiper,
      RecommendView,
      FeatureView,

      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },

    data(){
      return {
        banners: [],
        recommends: [],
        goods:{
          'pop': {page:0, list: []},
          'new': {page:0, list: []},
          'sell': {page:0, list: []}
        },
        currentType: 'pop'
      }
      
    },

    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },

    created(){
      this.getHomeMutidata();
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    
    methods:{

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
      },
      
      backClick(){
        this.$refs.scroll.scrollTo(0,0);
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
        const page = this.goods['pop'].page + 1;
        getHomeGoods(type,page).then(res => {
          console.log(res);
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page +=1;
        }
          
        )
      }
    }


  }
</script>

<style scoped>
  #home{
    padding-top: 44px;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint); 
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    position: sticky;
    top: 44px;
  }

  .content {
    /* 这里为什么不能加overflow */
    /* overflow: hidden; */

    position: absolute;
    top: 44px;
    bottom: 100px;
    left: 0;
    right: 0;
  }
</style>