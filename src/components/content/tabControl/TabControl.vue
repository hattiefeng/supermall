<template>
  <div class="tab-control">
    <div class="tab-control-item" 
      v-for="(item,index) in titles" 
      :key="item.iid" 
      :class="{active:currentIndex==index}"
      @click="tabClick(index)"> 
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      currentIndex : 0
    }
  },
  methods:{
    tabClick(index){
      this.currentIndex = index
      //传的参数 直接应用到父组件相关js代码中,template不用管参数
      this.$emit('tabClick',index);
    }
  }
}
</script>

<style scoped>

  .tab-control {
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    z-index: 9;
  }

  .tab-control-item {
    flex: 1;
  }

  .tab-control-item span {
    padding: 5px;
  }

  .active {
    color: var(--color-high-text);
  }

  .active span {
    border-bottom: 2px solid var(--color-high-text);
  }

</style>