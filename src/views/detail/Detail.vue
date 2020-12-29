<template>
  <div class="detail">
    <detail-nav-bar />
    <scroll class="content">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods" v-if="goods"></detail-base-info>
      <detail-shop-info v-if="shop" :shop="shop"></detail-shop-info>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar.vue';
  import DetailSwiper from './childComps/DetailSwiper.vue';
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";


  import {getGoodsDetail, Goods, Shop} from 'network/detail.js'
  import Scroll from "components/common/scroll/Scroll"

  export default {
    name: "Detail",
    components: {
      Scroll,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      getGoodsDetail,
      Goods,
      Shop
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: null,
        shop: null,
      }
    },
    created() {
      this.iid = this.$route.params.iid;
      getGoodsDetail(this.iid).then(res => {
        const data = res.result;
        console.log(data);
        this.topImages = data.itemInfo.topImages;

        //商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
        console.log(this.goods);

        //店铺信息
        this.shop = new Shop(data.shopInfo);
      }).catch(err => {
        console.log("数据请求失败");
      })
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
