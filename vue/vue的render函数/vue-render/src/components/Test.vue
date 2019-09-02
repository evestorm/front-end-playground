<template>
  <div @click="$emit('mousedown')">
    <h1 v-if="level == 1"><slot></slot></h1>
    <h1 v-if="level == 2"><slot></slot></h1>
    <h1 v-if="level == 3"><slot></slot></h1>
    <slot></slot>
    <br>
    {{name}}
  </div>
</template>

<script>
  export default {
    props: ['name', 'level']
  }
</script>

<style lang="scss" scoped>

</style>