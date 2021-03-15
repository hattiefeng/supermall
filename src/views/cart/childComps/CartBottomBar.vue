<template>
  <div class="cart-bottom">
    <div class="check-content">
      <check-button class="check-button" :isChecked="checkAll" @click.native="clickCheck"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计:  {{totalPricce}}
    </div>
    <div class="calculate">去计算({{checkLength}})</div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton.vue'
import { mapGetters } from 'vuex'


export default {
  name: "CartBottomBar",
  components:{
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),

    totalPricce(){
      return '¥' + this.cartList.filter(item => item.checked).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength(){
      return this.cartList.filter(item => item.checked).length
    },
    checkAll(){
      if(this.cartList.length === 0){
        return false
      }
      // return this.cartList.filter(item => item.checked).length === this.cartList.length

      //找到一个未选中的
      return !this.cartList.find(item => !item.checked)
    }
  },
  methods: {
    clickCheck(){
      //数组遍历过程中,做了修改操作,需要分开写
      if(this.checkAll){ //全部选中
        this.cartList.forEach(item => item.checked = false);
      }else{ //部分选中或全不选中
        this.cartList.forEach(item => item.checked = true);
      }
    }
  }
}
</script>

<style scoped>
  .cart-bottom {
    position: relative;
    display: flex;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    background-color:#eee;
  }

  .check-content {
    display: flex;
    
    align-items: center;
    width: 80px;
  }

  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-left: 10px;
    margin-right: 5px;
  }

  .price {
    margin-left: 30px;

    flex: 1;
  }

  .calculate {
    width: 90px;
    text-align: center;
    background-color: red;
    color: #fff;
  }
</style>