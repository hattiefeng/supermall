<template>
  <div class="detail">
    <detail-nav-bar />
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods" v-if="goods"></detail-base-info>
      <detail-shop-info v-if="shop" :shop="shop"></detail-shop-info>
      <detail-goods-info v-if="detailInfo" :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info v-if="goodsParam" :param-info="goodsParam" />
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar.vue';
  import DetailSwiper from './childComps/DetailSwiper.vue';
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
  import DetailParamInfo from "./childComps/DetailParamInfo"

  import {getGoodsDetail, Goods, Shop, GoodsParam} from 'network/detail.js'
  import Scroll from "components/common/scroll/Scroll"

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
      getGoodsDetail,
      Goods,
      Shop,
      GoodsParam
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: null,
        shop: null,
        detailInfo: null,
        goodsParam: null
      }
    },
    created() {
      this.iid = this.$route.params.iid;
      getGoodsDetail(this.iid).then(res => {
        const data = res.result;
        console.log(data);

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


      }).catch(err => {
        console.log("数据请求失败");
      })
    },
    methods:{
      imageLoad(){
        this.$refs.scroll.refresh();
      }
    }

  }
</script>

<style scoped>

  .detail {
    height: 100vh;
    background-color: #fff;
    position: relative;
    z-index: 1;
  }
  .content {
    background-color: #fff;
    height: calc(100% - 44px);
  }
</style>
