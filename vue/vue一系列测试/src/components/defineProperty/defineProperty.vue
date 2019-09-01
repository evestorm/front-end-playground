<template>
  <div>
    <h4>arr:</h4>
    <ul>
      <li v-for="(item, index) in arr" :key="index">{{item}}</li>
    </ul>
    <br>
    <h4>obj:</h4>
    <ul>
      <li v-for="(item, index) in obj" :key="index">{{item}}</li>
    </ul>
    <button @click="edit">修改Lance性别</button>
    <br>
    <!-- <ul>
      <li v-for="(item, index) in obj2" :key="index">{{item}}</li>
    </ul> -->
    <p>阅读更多：<a href="https://cn.vuejs.org/v2/guide/reactivity.html#%E5%A6%82%E4%BD%95%E8%BF%BD%E8%B8%AA%E5%8F%98%E5%8C%96" target="_blank">defineProperty无法监听对象属性的删除或添加</a></p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        arr: [1, 2],
        obj: {
          name: 'Lance',
          age: 19
        }
      }
    },
    mounted () {
      // 数组
      // ❌ 无法触发更新
      // this.arr[2] = 3
      // ✅
      this.$set(this.arr, 2, 3)
      // 对象
      // ❌ 通过 . 方式在已有对象属性上添加的新属性不是响应式的
      // this.obj.sex = '男'
      // ✅ 通过 set 方式在已有对象属性上添加的新属性是响应式的
      // 下方edit方法触发后set方式添加的新属性能监听到改变
      this.$set(this.obj, 'sex', '男')
      // ✅ 一次性添加多个属性用 Object.assign
      this.obj = Object.assign({}, this.obj, {
        weight: 120,
        professional: 'IT'
      })
      // ❌ 在data根级别下新建属性，能展示，但非响应式
      // this.obj2 = {
      //   name: 'Jerry',
      //   age: 25
      // }
      // ❌ 无法使用 set 在根级别添加新属性
      // this.$set(this.obj2, name, 'Jerry')
    },
    methods: {
      edit() {
        this.obj.sex = '女'
        this.obj.weight = 300
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>