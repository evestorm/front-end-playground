<template>
  <div>
    <h1>provide + inject</h1>
    <sub-component></sub-component>
  </div>
</template>

<script>
import subComponent from './children/subComponent'
  export default {
    // 依赖注入
    provide: { // 在父组件上提供一个属性，让其所有子组件都可以获取
      msg: 'provide中的msg'
    },
    components: {
      subComponent
    }
  }
</script>

<style lang="scss" scoped>

</style>