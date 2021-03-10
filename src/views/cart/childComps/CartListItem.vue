<template>
  <div id="shop-item">
    <div class="item-image">
      <img :src="itemInfo.image" alt="商品图片"/>
    </div>
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">{{itemInfo.desc}}</div>
      <div class="info-bottom">
        <div class="info-price left">¥{{itemInfo.price}}</div>
        <div class="info-count right">✖️{{itemInfo.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"CartListItem",
  props:{
    itemInfo:{
      type:Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style scoped>

</style>