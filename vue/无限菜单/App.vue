<template>
  <div id="app">
    <Menu>
      <template v-for="menu in menuList">
        <MenuItem :key="menu.title" v-if="!menu.children">
          {{menu.title}}
        </MenuItem>
        <!-- 把重复的内容，抽离出去 -->
        <ReSubMenu :key="menu.title" v-else :data="menu">

        </ReSubMenu>
      </template>
      <!-- <SubMenu>
        <template v-slot:title> 等于 <template #title>
        <template #title>
          菜单4
        </template>
        <MenuItem>菜单4-1</MenuItem>
        <MenuItem>菜单4-2</MenuItem>
      </SubMenu> -->
    </Menu>
  </div>
</template>

<script>
  import Menu from './Menu'
  import MenuItem from './MenuItem'
  import SubMenu from './SubMenu'
  import ReSubMenu from './ReSubMenu'
  export default {
    data() {
      return {
        menuList: [{
            title: '菜单1',
            children: [
              {
                title: '菜单1-1',
                children: [
                  {
                    title: '菜单1-1-1'
                  },
                  {
                    title: '菜单1-1-2'
                  },
                  {
                    title: '菜单1-1-3',
                    children: [
                      {
                        title: '菜单1-1-3-1'
                      },
                      {
                        title: '菜单1-1-3-2'
                      },
                    ]
                  },
                ]
              },
              {
                title: '菜单1-2'
              },
              {
                title: '菜单1-3'
              },
            ]
          },
          {
            title: '菜单2'
          }, {
            title: '菜单3'
          }
        ]
      }
    },
    components: {
      Menu,
      MenuItem,
      SubMenu,
      ReSubMenu
    },
  }
</script>

<style lang="css" scoped>

</style>