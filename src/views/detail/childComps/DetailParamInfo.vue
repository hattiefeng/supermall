<template>
  <div class="param-info">
    <div>{{this.paramInfo.image}}</div>
    <div>{{this.paramInfo.infos}}</div>
    <div>{{this.paramInfo.sizes}}</div>
  </div>
</template>

<script>
export default {
  name: "DetailParamInfo",
  props: {
    paramInfo: {
      type: Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style scoped>

</style>