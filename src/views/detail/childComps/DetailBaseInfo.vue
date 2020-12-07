<template>
  <div>
    <div>{{goods.title}}</div>
    <div>
      <span class="n-price">{{goods.price}}</span> 
      <span class="o-price">{{goods.oldPrice}}</span>
      <span class="discount" v-if="goods.discount">{{goods.discount}}</span>
    </div>
    <div>
      <span class="sell">{{goods.columns[0]}}</span>
      <span class="like">{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div v-for="index in goods.services.length-1" :key="index">
      <span><img :src="goods.services[index-1].icon" alt=""></span>
      <span>{{goods.services[index-1].name}}</span>
    </div>
    
  </div>

</template>

<script>
export default {
  name: "DatailBaseInfo",
  props:{
    goods:{
      type: Object,
      default: {}
    }
  }
}
</script>

<style scoped>

</style>