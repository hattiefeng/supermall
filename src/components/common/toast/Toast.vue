<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name:"Toast",
  data(){
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    show(message="默认信息", duration=2000) {
      this.isShow = true;
      this.message = message;
      setTimeout(() => {
        this.isShow = false
        this.message = ''
      }, duration);
    }
  }
}
</script>

<style scoped>
  .toast {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 6px 10px;
    color: #fff;
    background-color: rgba(0, 0, 0, .7);
    z-index: 999;
  }
</style>