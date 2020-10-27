<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>

  import BScroll from 'better-scroll'

  export default {

    data(){
      return {
        bscroll: null
      }
    },
    mounted(){
      this.bscroll = new BScroll(this.$refs.wrapper,{
        click: true
      });
      this.bscroll.scrollTo(0,0);
    },
    methods:{
      scrollTo(x, y, time=300){
        this.bscroll.scrollTo(x, y, time);
      }
    }
  }
</script>

<style>

</style>