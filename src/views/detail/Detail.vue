<template>
  <div class="detail">
    
    <detail-nav-bar class="detail-nav" @clickTitle="clickTitle" ref="detailNav"/>
    <scroll class="content" ref="scroll" :probe-type=3 @scroll="contentScroll">
     
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info  v-if="goods" :goods="goods" ></detail-base-info>
      <detail-shop-info v-if="shop" :shop="shop"></detail-shop-info>
      <detail-goods-info v-if="detailInfo" :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info v-if="goodsParam" :param-info="goodsParam" ref="param"/>
      <detail-comment-info v-if="commentInfo" :comment-info="commentInfo" ref="comment"/>
      <detail-recommend v-if="recommendList" :recommend-list="recommendList" ref="recommend"/>
    </scroll>
    <back-top @click.native="backClick" v-show="showBack"/>
    <detail-bottom-bar @addCart="addToCart"/>
    

  </div>
</template>

<script>

  import Scroll from "components/common/scroll/Scroll"

  import DetailNavBar from './childComps/DetailNavBar.vue';
  import DetailSwiper from './childComps/DetailSwiper.vue';
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailRecommend from "./childComps/DetailRecommend";
  import DetailCommentInfo from "./childComps/DetailCommentInfo"
  import DetailBottomBar from "./childComps/DetailBottomBar"

  import {getGoodsDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail.js'
  import { itemListenerMixin, backUpMixin } from "common/mixin.js"
  import { debounce } from 'common/utils'

  //将actions中的方法映射到methods中
  import { mapActions } from 'vuex'
  

  export default {
    name: "Detail",
    components: {
      Scroll,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailRecommend,
      DetailCommentInfo,
      DetailBottomBar,

      getGoodsDetail,
      Goods,
      Shop,
      GoodsParam,
      getRecommend
    },

    mixins:[itemListenerMixin, backUpMixin],

    data() {
      return {
        iid: null,
        topImages: [],
        goods: null,
        shop: null,
        detailInfo: null,
        goodsParam: null,
        commentInfo: {},
        recommendList:[],
        themeTopYs: [],
        currentIndex: 0,
        getThemeTopY: null
      }
    },
    created() {
      
      this.iid = this.$route.params.iid;
      getGoodsDetail(this.iid).then(res => {
        const data = res.result;
        // console.log(data);

        //1.顶部轮播图
        this.topImages = data.itemInfo.topImages;

        //2.商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
        // console.log(this.goods);

        //3.店铺信息
        this.shop = new Shop(data.shopInfo);

        //4.描述信息
        this.detailInfo = data.detailInfo;

        //5.参数
        this.goodsParam = new GoodsParam(data.itemParams.info, data.itemParams.rule);

        //6.评论
        if(data.rate.cRate>0){
          this.commentInfo = data.rate.list[0]
        }
      }).catch(err => {
        console.log("数据请求失败");
      })

              
        //7.推荐数据
      getRecommend().then(res => {
        // console.log(res);
        this.recommendList = res.data.list;
      })

      //赋值
      this.getThemeTopY= debounce(()=>{
        this.themeTopYs = []
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.param.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE);
        console.log(this.themeTopYs);
      }, 100)

    },
    mounted(){

    },
    methods:{
      ...mapActions(['addCart']),
      imageLoad(){

        this.$refs.scroll.refresh();
        this.getThemeTopY()

      },
      clickTitle(index){
        // console.log(this.themeTopYs[index]);
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index],200)
      },

      contentScroll(position){
        const positionY = -position.y;
        let length = this.themeTopYs.length;
        //1.方式1:先判断大于最后一个,再判断中间的between
        // if(this.currentIndex !== (length-1) && positionY >= this.themeTopYs[length-1]){
        //   this.currentIndex = length-1;
        //   console.log(this.currentIndex);
        // }else{
        //   for(let i = 0; i < length-1; i++){
        //     if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1] )){
        //       this.currentIndex = i;
        //       console.log(this.currentIndex);
        //     }
        //   }
        // }

        //1.方式2:加一个最大值,判断中间的between
        for(let i = 0; i < length-1; i++){ //length = 5 themeTopYs的下标为 0 1 2 3 4, i<length-1 => 0 1 2 3 
            if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1] )){
              this.currentIndex = i;
              this.$refs.detailNav.currentIndex = this.currentIndex;
            }
          }

         //展示回到顶部
        this.showBack = (-position.y) > 1000
      },
      
      addToCart(){
        // 将购物车信息存入vuex中
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;
        // console.log(product);

        // this.$store.commit('addCart', product);
        //dispatch 返回一个promise
        // this.$store.dispatch('addCart', product).then((res)=>{
        //   console.log(res);
        // })
        // 映射
        this.addCart(product).then((res)=>{
          console.log(res);
        })
      },
    },

    destroyed(){
      this.$bus.$off('itemImgLoad', this.itemImgListener);
    }

  }
</script>

<style scoped>

  .detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .content {
    background-color: #fff;
    height: calc(100% - 44px);
  }

  .detail-nav {
    position: relative;
    z-index: 99;
    background-color: #fff;
  }

</style>
