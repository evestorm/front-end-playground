<template>
   <div>
      <!-- 使用 v-bind="$attrs" 将父组件设置给当前组件的属性，全部移交给子元素 -->
      <input :value="value" @input="onInput" v-bind="$attrs">
   </div>
</template>

<script>
   export default {
      // 设置继承属性为false
      inheritAttrs: false,
      props: {
         value: {
            type: String,
            default: ""
         },
      },
      methods: {
         onInput(e) {
            this.$emit("input", e.target.value);

            this.$parent.$emit('validate');
         }
      },
   }
</script>

<style lang="scss" scoped>

</style>