<template>
   <div>
      <h3>自定义Form表单组件</h3>
      <hr>
      <sw-form :model="model" :rules="rules" ref="loginForm">
         <sw-form-item label="用户名" prop="username">
            <sw-input v-model="model.username" autocomplete="off" placeholder="输入用户名"></sw-input>
         </sw-form-item>
         <sw-form-item label="确认密码" prop="password">
            <sw-input type="password" v-model="model.password" autocomplete="off"></sw-input>
         </sw-form-item>
         <sw-form-item>
            <button @click="submitForm('loginForm')">提交</button>
         </sw-form-item>
      </sw-form>
      {{model}}
   </div>
</template>

<script>
   import SwForm from "./SwForm";
   import SwFormItem from "./SwFormItem";
   import SwInput from "./SwInput";

   import SwNotice from "@/components/notice/SwNotice";

   export default {
      components: {
         SwForm,
         SwFormItem,
         SwInput,
      },
      data() {
         return {
            model: {
               username: "Lance",
               password: ""
            },
            rules: {
               username: [{
                  required: true,
                  message: "请输入用户名"
               }],
               password: [{
                  required: true,
                  message: "请输入密码"
               }]
            }
         };
      },
      methods: {
         submitForm(form) {
            this.$refs[form].validate(valid => {
               // alert(valid ? '请求登录!' : '校验失败');
               const notice = this.$create(SwNotice, {
                  title: "提示",
                  message: valid ? "校验成功!" : "校验失败!",
                  duration: 1000
               });
               notice.show();
            });
         }
      }
   };
</script>