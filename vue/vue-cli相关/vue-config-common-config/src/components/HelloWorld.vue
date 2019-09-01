<template>
  <div class="hello">
    HelloWorld
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted() {
    // 跨域请求
    axios.get('/api/getUser').then(data => {
      console.log(data)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// 如果不使用插件，每次用 assets/common.scss 就得在组件中 import 它
// 麻烦
// 所以可以在 vue.config.js 的 pluginOptions 中配置
// 配置后就不用下面的import了，因为会给所有组件（全局）都加上common.scss
// @import '../assets/common.sass';
.hello {
  color: $color;
}
</style>
