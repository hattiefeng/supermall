<template>
  <div id="shop-item">
    <div class="item-selector">
      <check-button :is-checked="itemInfo.checked" @click.native="checkClick"></check-button>
    </div>
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

import CheckButton from 'components/content/checkButton/CheckButton.vue'

export default {
  name:"CartListItem",
  props:{
      itemInfo:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  components:{
    CheckButton
  },
  methods: {
    checkClick(){
      this.itemInfo.checked = !this.itemInfo.checked
    }
  }


}
</script>

<style scoped>

  #shop-item {
    width: 100%;
    padding: 5px;
    border-bottom: 1px solid #ccc;
    display: flex;
    font-size: 0px;
  }
  
  .item-selector {
    width: 14%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-image {
    padding: 5px;
  }

  .item-image img {
    width: 80px;
    height: 100px;
    border-radius: 5px;
    display: block;
  }

  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    /* 子绝父相 */
    position: relative; 
    overflow: hidden;
  }

  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .info-bottom .info-price {
    color: orangered;
  }

</style>