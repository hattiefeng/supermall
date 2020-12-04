<template>
  <div>
    <detail-nav-bar></detail-nav-bar>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar.vue';

  import {getGoodsDetail} from 'network/detail.js'

  export default {
    components: {
      DetailNavBar
    },
    data() {
      return {
        iid: null,
        topImages: []
      }
    },
    watch: {
      '$route'(to, from) {
        //监听路由是否变化
        if (this.$route.params.iid) {
          // 判断条件1  判断传递值的变化
          this.iid = this.$route.params.iid;
          //获取文章数据
          getGoodsDetail(this.iid).then(res => {
            console.log(res);
            this.topImages = res.result.itemInfo.topImages;
            console.log(this.topImages);
          }).catch(err => {
            console.log("数据请求失败");
          })
          
        }
      }

    }

  }
</script>

<style>
</style>
