<template>
    <div class="tab-bar-item" @click="itemClick">
      <!-- <img src="../../assets/img/tabbar/home.svg" alt="">
      <div>首页</div> -->
      <div v-if="!isActive"><slot name="item-icon" ></slot></div>
      <div v-else><slot name="item-icon-active"></slot></div>
      <div :style="activeStyle"><slot name="item-text"></slot></div>

    </div> 
</template>

<script>
export default {
  data(){
    return{
      // isActive:false
    }
  },
  props:{
    link: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  //计算属性是属性
  computed:{
    isActive(){
      //当前活跃的路径中是否包含传入的这个link
      return this.$route.path.indexOf(this.link) !== -1;
    },
    activeStyle(){
      return this.isActive ? {color:this.activeColor} : {}
    }
  },
  methods:{
    itemClick(){
      this.$router.replace(this.link);
    }
  }
}
</script>

<style>

  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img{
    height: 24px;
    width: 24px;
    margin-top: 3px;
    /* 图片下边有默认3px 图片文字垂直对齐能去掉这3px */
    vertical-align: middle;
    margin-bottom: 2px;
  }

  /* .ative{
    color: rosybrown;
  } */
</style>