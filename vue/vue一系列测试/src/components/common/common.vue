<template>
  <div>
    <h1>Vue常用内容</h1>
    <hr>

    <h2>v-model数据绑定</h2>
    <h3>select选项</h3>
    <div class="select">
      <select v-model="selectValue">
        <option value="0" disabled>请选择</option>
        <option v-for="item in list" :key="item.id" :value="item.id">{{item.value}}</option>
      </select>
      {{selectValue}}
    </div>
    <h3>radio单选项</h3>
    <div class="radio">
      男：<input type="radio" v-model="radioValue" value="男">
      女：<input type="radio" v-model="radioValue" value="女">
      ——————> {{radioValue}}
    </div>
    <h3>checkbox 全选/多选 true/false</h3>
    <div class="checkbox">
      <input type="checkbox" v-model="checkValue"> ————> {{checkValue}}
    </div>
    <h3>checkbox 爱好</h3>
    <div class="checkbox">
      游泳：<input type="checkbox" v-model="checkValues" value="游泳">
      健身：<input type="checkbox" v-model="checkValues" value="健身">
      ————> {{checkValues}}
    </div>
    <hr>

    <h2>computed</h2>
    <h3>全选全不选</h3>
    <div class="computed-checkbox">
      <span>全选：</span><input type="checkbox" v-model="checkAll">
      <br>
      <input type="checkbox" v-for="(item, key) in checks" :key="key" v-model="item.value">
    </div>

    <h2>修饰符</h2>
    <h3>.number</h3>
    <div class="number">
      不使用.number修饰符：<input type="text" v-model="num"> {{typeof num}}
      使用.number修饰符：<input type="text" v-model.number="num2"> {{typeof num2}}
    </div>
    <h3>.trim</h3>
    <div class="trim">
      不使用.trim修饰符：<input type="text" v-model="str"> <pre>{{str}}</pre>
      使用.trim修饰符：<input type="text" v-model.trim="str2"> <pre>{{str2}}</pre>
      同时使用.trim .number两个修饰符：<input type="text" v-model.trim.number="str2"> <pre>{{str2}}</pre>
    </div>
    <h3>.enter .esc</h3>
    <div class="enter">
      抬起回车键触发：<input type="text" @keyup.enter="fn">
    </div>
    <h3>自定义keyCode</h3>
    <div class="key-code">
      抬起f1键触发（mac按下fn+F1触发）：<input type="text" @keyup.f1="fn">
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    data() {
      return {
        selectValue: 0,
        list: [{id: 1, value: 'React'}, {id: 2, value: 'Vue'}, {id: 3, value: 'Angular'}],
        radioValue: '男',
        checkValue: true,
        checkValues: [],

        checks: [{value: true}, {value: false}, {value: false}],

        num: 0,
        num2: 1,
        str: '',
        str2: '',

      }
    },
    mounted() {
      Vue.config.keyCodes = {
        'f1': 112
      }
    },
    methods: {
      fn() {
        alert('抬起了特定按键')
      }
    },
    computed: {
      checkAll: {
        get() {
          return this.checks.every(v => v.value)
        },
        set(newValue) {
          this.checks.forEach(v => v.value = newValue)
        }
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>