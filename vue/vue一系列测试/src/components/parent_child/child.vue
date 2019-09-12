<template>
  <div>
    <button @click="$listeners.click()">@click="$listeners.click()"</button>
    <br>
    <button @click="$emit('click')">@click="$emit('click')"</button><span>父组件相当于给子组件绑定了一个click属性，值为change函数 ——> this.$on('click', change)</span>
    <br>
    <h3>v-on="$listeners"触发所有事件：click和mouseup都绑定了change事件</h3>
    <button v-on="$listeners">v-on="$listeners"</button>
  </div>
</template>

<script>
  export default {
    name: 'child'
  }
</script>

<style lang="scss" scoped>

</style>