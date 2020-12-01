<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div class="titleItem" 
          v-for="(item, index) in titles" :key="item.iid" 
          :class="{active:index===currentIndex}" 
          @click="clickTitle(index)">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>



<script>

import NavBar from "components/common/navbar/NavBar"

export default {
  components:{
    NavBar
  },
  data(){
    return {
      titles:['商品','参数','评论','推荐'],
      currentIndex: 0
    }
  },
  methods:{
    clickTitle(index){
      this.currentIndex = index;
    },

    backClick(){
      this.$router.back();
    }
  }
}
</script>

<style>
  .active {
    color: var(--color-high-text)
  }

  .title {
    display: flex;
    font-size: 12px;
  }

  .titleItem {
    flex: 1;
  }

  .back {
    margin-top: 8px;
  }
</style>