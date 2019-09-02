<template>
  <div>
    <h1>User</h1>
    <ul>
      <li><router-link :to="{name: 'userAdd'}">添加成员</router-link></li>      
      <li><router-link :to="{name: 'userProfile'}">个人信息</router-link></li>
    </ul>
    <router-view />
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>

</style>