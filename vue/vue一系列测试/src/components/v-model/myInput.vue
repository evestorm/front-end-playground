<template>
  <div>
    <input type="text" :value="value" @input="inputHandle">
  </div>
</template>

<script>
  export default {
    name: 'my-input',
    props: ['value'],
    methods: {
      inputHandle(e) {
        this.$emit('input', e.target.value)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>