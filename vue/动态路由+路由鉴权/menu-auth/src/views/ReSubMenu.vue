<template>
  <!-- 封装递归组件 -->
  <el-submenu :index="data.path">
    <!-- 子菜单标题 -->
    <template slot="title">
      <router-link :to="data.path">{{data.name}}</router-link>
    </template>
    <template v-for="c in data.children">
      <!-- 若子菜单还有children，继续递归自己 -->
      <ReSubMenu :key="c.auth" v-if="data.children" :data="c">
      </ReSubMenu>
      <!-- 没有则直接显示 -->
      <el-menu-item :key="c.auth" v-else :index="c.path">
        {{c.name}}
      </el-menu-item>
    </template>
  </el-submenu>
</template>

<script>
  export default {
    name: "ReSubMenu",
    props: {
      data: {
        type: Object,
        default: () => ({})
      }
    }
  }
</script>