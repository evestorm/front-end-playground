<template>
  <SubMenu>
    <template #title>
      {{data.title}}
    </template>
    <template v-for="child in data.children">
      <MenuItem :key="child.title" v-if="!child.children">{{child.title}}</MenuItem>
      <ReSub :key="child.title" :data="child" v-else></ReSub>
    </template>
  </SubMenu>
<!-- {
title: '菜单1',
  children: [{title: '菜单1-1'},
    {title: '菜单1-2'},
    {title: '菜单1-3'}]
}, -->
</template>

<script>
import SubMenu from './SubMenu'
import MenuItem from './MenuItem'
  export default {
    name: 'ReSub', // 起名字可以使用递归组件
    props: {
      data: {
        type: Object,
        default: () => ({})
      }
    },
    components: {
      SubMenu,
      MenuItem
    },
  }
</script>

<style lang="css" scoped>

</style>