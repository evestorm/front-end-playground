<template>
  <div>
    <h1>sync修饰符————>对一个 prop 进行“双向绑定”</h1>
    <pre>
      父组件：<sub-component :子prop值.sync='父data值'/>
    </pre>
    <div class="details">
      <!-- <子组件 :子prop值.sync='父data值'/> -->
        <myComponent :show.sync='valueChild' style="padding: 30px 20px 30px 5px;border:1px solid #ddd;margin-bottom: 10px;"></myComponent>
        <button @click="changeValue">toggle</button>
    </div>
  </div>
</template>

<script>
import myComponent from './myComponent'
  export default {
    data(){
      return {
        valueChild: true,
      }
    },
    methods:{
      changeValue() {
        console.log('点击父组件toggle按钮触发')
        this.valueChild = !this.valueChild
      },
    },
    components: {
      myComponent,
    },
  }
</script>

<style lang="scss" scoped>

</style>