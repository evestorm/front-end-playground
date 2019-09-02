<template>
  <div>
    <h1>登录</h1>
    <Input type="text" v-model="username" placeholder="请输入用户名" style="width: 300px"/>
    <Button type="primary" @click="login">登录</Button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
  export default {
    data() {
      return {
        username: ''
      }
    },
    methods: {
      ...mapActions(['toLogin']),
      login() {
        this['toLogin'](this.username).then(data => {
          this.$router.push('/')
        }, err => {
          this.$Message.error(err)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>