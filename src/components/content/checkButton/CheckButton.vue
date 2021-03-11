<template>
  <div class="check-button">
    <img src="~assets/img/cart/tick.svg" :class="{check: isChecked}" alt="">
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
  .check-button img{
    position: relative;
    margin: 0;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    border: 2px solid #aaa;
    cursor: pointer;
  }

  .check-button .check {
    background-color: red;
    border-color: red;
  }

</style>