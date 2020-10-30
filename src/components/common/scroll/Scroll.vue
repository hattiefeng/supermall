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
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return {
        scroll: null
      }
    },
    mounted(){
      this.scroll = new BScroll(this.$refs.wrapper,{
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      });
      if(3 === this.probeType || 2 === this.probeType){
        this.scroll.on('scroll', (position) => {
          this.$emit('scroll', position);
        });
      }
      //上拉加载更多
      if(this.pullUpLoad){
        this.scroll.on('pullingUp', ()=>{
          this.$emit('pullingUp');   
        })
      } 
    },

    methods:{
      scrollTo(x, y, time=300){
        this.scroll.scrollTo(x, y, time);
      },
      refresh(){
        this.scroll && this.scroll.refresh();
      },
      finishPullUp(){
        this.scroll && this.scroll.finishPullUp();
      }
    }
  }
</script>

<style>

</style>