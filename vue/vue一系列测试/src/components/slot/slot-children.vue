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
    <div class="new">
      <slot name='new'></slot>
    </div>
    <div class="new2">
      <slot name='new2' :bilibili='bilibili'></slot>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: ['front-end', 'back-end', 'fullstack'],
        msg: 'Lance',
        bilibili: '哔哩哔哩干杯'
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
.new {
  width: 100%;
  background: green;
  text-align: center;
}
</style>