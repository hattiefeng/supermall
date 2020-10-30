<template>
  <div class="goods-list">
    <goods-list-item v-for="item in goodslist" :key="item.iid" :goodsItem="item"/>
  </div>
</template>

<script>

  import GoodsListItem from './GoodsListItem'

  export default {
    props:{
      goodslist:{
        type: Array,
        default(){
          return []
        }
      }
    },

    components:{
      GoodsListItem
    }

  }
</script>

<style>
  .goods-list {
    display: flex;
    flex-wrap: wrap;

    justify-content: space-around;
    padding: 2px;
  }
</style>