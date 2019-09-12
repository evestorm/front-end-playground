<template>
  <div>
    <h1>父子传值</h1>
    <Child @click="change" @mouseup="change"></Child>
  </div>
</template>

<script>
import Child from './child'
  export default {
    name: 'parent',
    components: {
      Child,
    },
    methods: {
      change() {
        alert(1)
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>