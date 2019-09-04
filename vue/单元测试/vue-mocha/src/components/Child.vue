<template>
  <div>
    <button>点我显示父组件内容</button>
    <button id="fn" @click="clickMe">点我调用父组件传来的方法</button>
  </div>
</template>

<script>
  export default {
    props: {
      fn: {}
    },
    methods: {
      clickMe() {
        // this.fn()
        this.fn('bilibili')
        this.fn('dilidili')
      }
    }
  }
</script>