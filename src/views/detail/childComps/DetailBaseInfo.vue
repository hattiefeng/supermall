<template>
  <div class="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.price}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span class="discount" v-if="goods.discount">{{goods.discount}}</span>
    </div>
    <!-- <div>
      <span :class="[index === 0 ? 'sell': (index === 1?'like':'')]"
            v-for=" (item,index) in goods.columns">{{item}}</span>
    </div> -->
    <div>
      <span class="sell">{{goods.columns[0]}}</span>
      <span class="like">{{goods.columns[1]}}</span>
      <span >{{goods.services[0].name}}</span> 
    </div>
    <div v-for=" index in goods.services.length-2" :key="index">
      <span><img :src="goods.services[index].icon"></span>
      <span>{{goods.services[index].name}}</span>
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
  .base-info {
    margin-top: 15px;
    padding: 0 8px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-title {
    color: #222;
  }

  .info-price {
    margin-top: 10px;
  }

  .info-price .n-price {
    font-size: 24px;
    color: var(--color-high-text);
  }
</style>
