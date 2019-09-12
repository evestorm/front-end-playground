<template>
  <div>
    <h2>v-model语法糖</h2>
    {{msg}}
    <h3>:value + @input 写法1</h3>
    <input :value='msg' @input="msg=$event.target.value">
    {{grammer1}}
    <hr>
    <h3>:value + @input 原始写法2</h3>
    <input :value='msg' @input="fn2">
    {{grammer2}}
    <hr>
    <h3>:value + @input 原始写法3</h3>
    <input :value='msg' @input="fn3($event, 1)">
    {{grammer3}}
    <hr>
    <h3>:value + @input 原始写法4</h3>
    <input :value="msg" @input="(e) => {msg = e.target.value}">
    {{grammer4}}
    <hr>
    <h3>v-model是上方代码的语法糖</h3>
    <input v-model="msg">
    {{grammer5}}
    <hr>
    <h2>自定义组件 v-model</h2>
    <my-counter v-model="value"></my-counter>{{value}}
    <my-input v-model.number="value"></my-input>
  </div>
</template>

<script>
import MyCounter from './myCounter'
import MyInput from './myInput'
  export default {
    name: 'vmodel',
    data() {
      return {
        msg: 'lance',
        grammer1: `
          <input :value='msg' @input="msg=$event.target.value">
        `,
        grammer2: `
          <input :value='msg' @input="fn2">
          fn2(e) {
            this.msg = e.target.value
          }
        `,
        grammer3: `
          <input :value='msg' @input="fn3($event, 1)">
          fn3(e, a) {
            console.log(a)
            this.msg = e.target.value
          }
        `,
        grammer4: `
          <input :value="msg" @input="(e) => {msg = e.target.value}">
        `,
        grammer5: `
          <input v-model="msg">
        `,
        value: 1
      }
    },
    methods: {
      fn2(e) {
        this.msg = e.target.value
      },
      fn3(e, a) {
        console.log(a)
        this.msg = e.target.value
      }
    },
    components: {
      MyCounter,
      MyInput
    },
  }
</script>

<style lang="scss" scoped>

</style>