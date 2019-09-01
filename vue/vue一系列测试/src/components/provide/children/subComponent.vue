<template>
  <div>
    <h3>我是子组件</h3>
    <p>我获取到了父组件的：{{msg}}</p>
  </div>
</template>

<script>
  export default {
    inject: ['msg']
  }
</script>

<style lang="scss" scoped>

</style>