<template>
  <div class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <div v-for="(detailImages, index) in detailInfo.detailImage" :key="index">
        <img v-for="(item, index2) in detailImages.list" :key="index2" :src="item" @load="imgLoad" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props:{
    detailInfo:{
      type: Object,
      default(){
        return {}
      }
    }
  },
  data(){
    return {
      counter: 0,
      imgLength: 0
    }
  },
  methods:{
    //imgLoad 循环加载图片 每加载一张,imgLoad()方法调用一次
    imgLoad(){
      // this.counter累计 图片加载张数 当累计张数等于总张数时,调用better-scroll的refresh
      if(++this.counter === this.imgLength){
        this.$emit("imageLoad");
      }
    }
  },
  // watch监听detailInfo属性的变化
  watch:{
    detailInfo(){
      //获取图片个数
      this.imgLength = 0;
      for(var i = 0; i < this.detailInfo.detailImage.length; i++){
        this.imgLength += this.detailInfo.detailImage[i].list.length;
      }
  }
}}
</script>

<style scoped>

  .goods-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-desc {
    padding: 0 15px;
  }

  .info-desc .start, .info-desc .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }

  .info-desc .start {
    float: left;
  }

  .info-desc .end {
    float: right;
  }

  .info-desc .start::before, .info-desc .end::after {
    content: "";
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }

  .info-desc .end::after {
    right: 0;
  }

  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
  }

  .info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }

  .info-list img{
    width: 100%;
  }
</style>