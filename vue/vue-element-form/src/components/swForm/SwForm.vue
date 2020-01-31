<template>
   <div>
      <slot></slot>
   </div>
</template>

<script>
   export default {
      provide() {
         return {
            // 将自己传给子孙后代
            form: this,
         }
      },
      props: {
         model: { // 模型
            type: Object,
            required: true,
         },
         rules: { // 规则
            type: Object
         }
      },
      methods: {
         validate(cb) {
            // 找到所有需要校验的 SwFormItem（带有prop的都是），拿到它们中的 validate 校验方法
            const tasks = this.$children
               .filter(item => item.prop)
               .map(item => item.validate())
            console.log(tasks);
            // 所有任务都通过才算校验通过
            Promise.all(tasks)
               .then(() => cb(true))
               .catch(() => cb(false))
         }
      },
   }
</script>

<style lang="scss" scoped>

</style>