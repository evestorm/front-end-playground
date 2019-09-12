<template>
  <div>
    <h1>provide + inject</h1>
    <sub-component></sub-component>
    <button @click="changeMsg">更改provide的msg（非响应式，无变化）</button><br>
    <button @click="changeColor">更改provide的theme.color（响应式，子组件背景色改变）</button>{{theme.color}}
  </div>
</template>

<script>
import subComponent from './children/subComponent'
import Vue from 'vue'
  export default {
    // provide: {
    //   msg: '...'
    // }
    // 依赖注入
    provide() { // 在父组件上提供一个属性，让其所有子组件都可以获取
      this.theme = Vue.observable({
        color: 'red'
      })
      return {
        msg: '(provide中的msg，非响应式)',
        theme: this.theme
      }
    },
    methods: {
      changeMsg() {
        this.msg = '开花'
      },
      changeColor() {
        this.theme.color = this.theme.color === 'red' ? 'lightblue' : 'red'
      }
    },
    components: {
      subComponent
    }
  }
</script>

<style lang="scss" scoped>

</style>