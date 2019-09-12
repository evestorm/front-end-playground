<template>
  <div>
    <Children>
      <template>
        <h1>我是首页（匿名插槽）</h1>
        <hr>
        <h4>父组件template默认不给名为匿名插槽，子组件slot匹配</h4>
        <pre>
          <div>父：{{resourceHeader}}</div>
          <div>子：{{childHeader}}</div>
        </pre>
      </template>
      <template slot='list' slot-scope='children'>
        <span>msg:{{children.msg}}</span>
        <p>我是列表（带数据插槽）：</p>
        <ul>
          <li v-for="(item, index) in children.data" :key="index">
            {{item}}
          </li>
        </ul>
        <hr>
        <h4>父通过slot给自己命名，通过[slot-scope='children']形式给子组件作用域命名，通过[children.msg]方式获取值</h4>
        <pre>
          <div>父：{{resourceList}}</div>
          <div>子：{{childList}}</div>
        </pre>
      </template>
      <template slot="footer">
        <footer>我是底部（作用域插槽）</footer>
        <hr>
        <h4>父通过slot给自己命名，子组件通过name获取此插槽</h4>
        <pre>
          <div>父：{{resourceFooter}}</div>
          <div>子：{{childFooter}}</div>
        </pre>
      </template>
    </Children>
  </div>
</template>

<script>
import Children from './slot-children'
  export default {
    data() {
      return {
        resourceHeader: `<template>
                      <h1>我是首页（匿名插槽）</h1>
    </template>`,
        childHeader: `<div class="header">
          <slot></slot>
</div>`,
        resourceList: `<template slot='list' slot-scope='children'>
      <span>msg:{{children.msg}}</span>
      <p>我是列表（带数据插槽）：</p>
      <ul>
        <li v-for="(item, index) in children.data" :key="index">
          {{item}}
        </li>
      </ul>
    </template>`,
        childList: `<div class="main">
      <slot name='list' :data='list' :msg='msg'></slot>
    </div>`,
        resourceFooter: `<template slot="footer">...</template>`,
        childFooter: `<slot name='footer'></slot>`
      }
    },
    components: {
      Children
    }
  }
</script>

<style lang="scss" scoped>
pre {
  display: flex;
}
pre div {
  flex: 1;
}
</style>