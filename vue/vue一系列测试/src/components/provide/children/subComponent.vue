<template>
  <div :style='"background-color: "+theme.color'>
    <h3>我是子组件</h3>
    <p>我获取到了父组件的：{{msg}}</p>
    <p>{{theme.color}}</p>
  </div>
</template>

<script>
  export default {
    // inject: ['msg']
    inject: {
      msg: {
        default: String
      },
      theme: {
        default: Object
      }
    },
    watch: {
      'theme.color'(newValue) {
        console.log(newValue)
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>