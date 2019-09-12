<template>
  <div>
    <div class="header">
      <slot></slot>
    </div>
    <div class="main">
      <slot name='list' :data='list' :msg='msg'></slot>
    </div>
    <div class="footer">
      <slot name='footer'></slot>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: ['front-end', 'back-end', 'fullstack'],
        msg: 'Lance'
      }
    },
  }
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  background-color: yellow;
  text-align: center;
}
.main {
  background-color: lightblue;
}
.footer {
  width: 100%;
  background-color: #e1e1e1;
  text-align: center;
}
</style>