import Vue from 'vue';
import Vuex from 'vuex';

// 1.use
Vue.use(Vuex);

//2.创建store对象
const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCounter(state, payload) {
      payload.count++;
    },
    addToCart(state, payload) {
      payload.count = 1;
      state.cartList.push(payload);
    }
  },
  actions: {
    addCart(context, payload) {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);
      if (oldProduct) {
        context.commit('addCounter', oldProduct);
      } else {
        context.commit('addToCart', payload);
      }
    }
  }
})

//3.导出挂载到Vue实例上
export default store;