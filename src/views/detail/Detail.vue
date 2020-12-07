<template>
  <div>
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar.vue';
  import DetailSwiper from './childComps/DetailSwiper.vue'
  import DetailBaseInfo from "./childComps/DetailBaseInfo"


  import {getGoodsDetail, Goods} from 'network/detail.js'

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      getGoodsDetail,
      Goods
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {}
      }
    },
    created() {
      this.iid = this.$route.params.iid;
      getGoodsDetail(this.iid).then(res => {
        const data = res.result;
        // console.log(data);
        this.topImages = data.itemInfo.topImages;
        
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
        console.log(this.goods);
        
      }).catch(err => {
        console.log("数据请求失败");
      })
    }

  }
</script>

<style>
</style>
