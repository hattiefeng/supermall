<template>
  <div>
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images="topImages"></detail-swiper>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar.vue';
  import DetailSwiper from './childComps/DetailSwiper.vue'

  import {getGoodsDetail} from 'network/detail.js'

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      getGoodsDetail
    },
    data() {
      return {
        iid: null,
        topImages: []
      }
    },
    created() {
      this.iid = this.$route.params.iid;
      getGoodsDetail(this.iid).then(res => {
        this.topImages = res.result.itemInfo.topImages;
        // console.log(this.topImages);
      }).catch(err => {
        console.log("数据请求失败");
      })
    }

  }
</script>

<style>
</style>
