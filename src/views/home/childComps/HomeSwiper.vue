<template>
  <swiper>
    <swiper-item v-for="item in banners" :key="item.title">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imgLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from "components/common/swiper/index.js"

  export default {
    props:{
      banners:{
        type: Array,
        default(){
          return []
        }
      }
    },
    data(){
      return {
        isLoad: false
      }
    },
    methods:{
      imgLoad(){
        if(!this.isLoad){
          this.$emit('swiperImgLoad')
        }
        this.isLoad = true;
      }
    },
    components:{
      Swiper, 
      SwiperItem
    }

  }
</script>

<style>

</style>