<template>
   <div>
      <label v-if="label">{{ label }}</label>
      <slot></slot>
      <p v-if="errorMessage">{{ errorMessage }}</p>
   </div>
</template>

<script>
   // npm i async-validator -S
   import Schema from 'async-validator';
   export default {
      inject: ["form"],
      props: {
         label: {
            type: String,
            default: ""
         },
         prop: {
            type: String,
         }
      },
      data() {
         return {
            errorMessage: ""
         }
      },
      mounted() {
         this.$on('validate', this.validate);
      },
      methods: {
         validate() {
            // 做校验
            const value = this.form.model[this.prop]
            const rules = this.form.rules[this.prop]

            // 设置校验规则
            const desc = {
               [this.prop]: rules
            };
            // 实例化 Schema
            const schema = new Schema(desc);
            console.log(schema);
            // 开始校验
            const p = schema.validate({
               [this.prop]: value
            }, errors => {
               this.errorMessage = errors ? errors[0].message : '';
            }); // return 的是个 Promise
            console.log(p);
            return p;
         }
      },
   }
</script>

<style lang="scss" scoped>

</style>