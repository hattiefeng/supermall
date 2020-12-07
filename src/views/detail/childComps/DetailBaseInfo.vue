<template>
  <div>
    <div>{{goods.title}}</div>
    <div>
      <span class="n-price">{{goods.price}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span class="discount" v-if="goods.discount">{{goods.discount}}</span>
    </div>
    <div>
      <span :class="[index === 0 ? 'sell': (index === 1?'like':'')]"
            v-for=" (item,index) in goods.columns">{{item}}</span>
    </div>
    <div v-for=" s in goods.services" :key="s.id">
      <span><img :src="s.icon"></span>
      <span>{{s.name}}</span>
    </div>

  </div>

</template>

<script>
  export default {
    name: "DatailBaseInfo",
    watch: {
      goods(g) {
        console.log("init");
        console.log(g);
      }
    },
    props: {
      goods: {
        type: Object,
        default: {}
      }
    }
  }
</script>

<style scoped>

</style>
