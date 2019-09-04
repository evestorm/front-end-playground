<template>
  <div>
    <Child @show="show"></Child>
    <div id="content" v-if="isShow">内容</div>
  </div>
</template>

<script>
  import Child from './Child'
  export default {
    data() {
      return {
        isShow: false
      }
    },
    components: {
      Child,
    },
    methods: {
      show() {
        this.isShow = true
      }
    },
  }
</script>