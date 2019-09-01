<template>
  <div v-if="show">
    <pre>
      < button @click.stop="closeDiv">关闭</>
      this.$emit('update:show', false); //触发 input 事件，并传入新值
    </pre>
      <p>默认初始值是{{show}}，所以是显示的</p>
      <button @click.stop="closeDiv">关闭</button>
    </div>
</template>

<script>
  export default {
    props:['show'],
    methods: {
      closeDiv() {
        console.log('点击子组件关闭按钮触发')
        // $emit('update:子prop', 值)
        this.$emit('update:show', false); //触发 input 事件，并传入新值
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>