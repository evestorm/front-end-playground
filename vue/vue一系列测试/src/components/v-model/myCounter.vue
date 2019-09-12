<template>
  <div>
    {{value}}
    <button @click="minu">-</button>
    <button @click="plus">+</button>
  </div>
</template>

<script>
  export default {
    name: 'my-counter',
    props: {
      value: {
        type: Number,  // 接收一个 value 类型是Number
        default: 0
      }
    },
    methods: {
      plus() {
        let val = this.value
        val++
        this.$emit('input', val)  // 触发 input 事件，并传入新值
      },
      minu() {
        let val = this.value
        val--
        this.$emit('input', val) // 触发 input 事件，并传入新值
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>