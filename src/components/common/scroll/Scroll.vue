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
      //1.创建Scroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      });
      //2.监听滚动的位置
      if(3 === this.probeType || 2 === this.probeType){
        this.scroll.on('scroll', (position) => {
          this.$emit('scroll', position);
        });
      }
      //3.监听上拉事件
      if(this.pullUpLoad){
        this.scroll.on('pullingUp',()=>{
          debugger;
          this.$emit('pullingUp')
          console.log(1);
        })
      }
    },

    methods:{
      scrollTo(x, y, time=300){
        this.scroll.scrollTo(x, y, time);
      },
      refresh(){
        this.scroll.refresh();
      },
      finishPullUp(){
        this.scroll && this.scroll.finishPullUp();
      },
      getScrollY(){
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style>

</style>
