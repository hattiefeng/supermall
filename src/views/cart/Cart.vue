<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <cart-list/>
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import CartList from './childComps/CartList.vue'
import CartBottomBar from './childComps/CartBottomBar.vue'


import { mapGetters } from 'vuex'

export default {
  name: "cart",
  components:{
    NavBar,
    CartList,
    CartBottomBar
  },
  computed:{
    //两种写法 数组用法 对象用法
    // ...mapGetters(['cartLength','cartList'])
    ...mapGetters({
      length:'cartLength',
      list:'cartList'
    })
  },
}
</script>

<style scoped>

  .cart {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }


</style>
