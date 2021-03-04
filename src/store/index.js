import Vue from 'vue';
import Vuex from 'vuex';

import mutations from './mutations'
import actions from './actions'

// 1.use
Vue.use(Vuex);

//2.创建store对象

const state = {
  cartList: []
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

//3.导出挂载到Vue实例上
export default store;