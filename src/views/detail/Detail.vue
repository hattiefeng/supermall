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
        iid: null
      }
    },
    watch: {
      '$route'(to, from) {
        //监听路由是否变化
        if (this.$route.params.iid) {
          // 判断条件1  判断传递值的变化
          this.iid = this.$route.params.iid;
          //获取文章数据
        }
      }
    }

  }
</script>

<style>
</style>
