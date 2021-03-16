import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from './components/common/toast'

import VueLazyLoad from 'vue-lazyload'
import FastClick from 'fastclick'

Vue.config.productionTip = false
  //添加事件总线对象
Vue.prototype.$bus = new Vue()
  // 安装toast 会去执行toast的install函数
Vue.use(toast)

//使用懒加载插件
Vue.use(VueLazyLoad, {
  //占位图
  loading: require('./assets/img/common/placeholder.png')
})

FastClick.attach(document.body);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')