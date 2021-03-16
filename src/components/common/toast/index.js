import Toast from './Toast'

const obj = {}

obj.install = function(Vue) {
  //1.Vue.extend 创建 构造器
  const toastConstractor = Vue.extend(Toast);

  //2.new 根据构造器创建对象
  const toast = new toastConstractor();

  //3.$mount 将组件对象手动挂载到某个元素上
  toast.$mount(document.createElement('div'))

  //4.toast.$el对应的就是上面的div
  document.body.appendChild(toast.$el)

  //toast组件构造器创建出来的对象
  Vue.prototype.$toast = toast

}

export default obj