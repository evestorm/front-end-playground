<template>
  <div>
    <el-menu default-active="2" class="el-menu-vertical-demo" :router="true">
      <template v-for="m in menuList">
        <!-- 递归组件 -->
        <!-- 判断条件：有children的就是带有子菜单的，使用递归组件 -->
        <ReSubMenu :data="m" :key="m.auth" v-if="m.children"></ReSubMenu>
        <!-- 没有children的情况 -->
        <el-menu-item v-else :key="m.auth" :index="m.path">{{m.name}}</el-menu-item>
      </template>
    </el-menu>
    <router-view></router-view>
  </div>

</template>
<script>
  //导入vuex中的方法，具体参考我的文章
  import {
    mapState
  } from "vuex";
  import ReSubMenu from "./ReSubMenu";
  export default {
    name: "home",
    computed: {
      //根据后端传过来的数据来渲染Home
      ...mapState(["menuList"])
    },
    components: {
      ReSubMenu
    }
  };
</script>