import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

// 首先导入router中完整的权限路由列表
import { authRoutes } from './router'

Vue.use(Vuex)

// 把后端返回的菜单列表数据，转为无限级菜单格式
let formatMenuList = (menuList) => {
  let arr = [] // [cart, cart-list, profile, ...]
  function r(pid) {
    //filter过滤数组，返回一个满足要求的数组
    return menuList.filter(menu => {
      //格式化菜单变成我们需要的结果
      if (menu.pid === pid) {
        arr.push(menu.auth) // 把后端返回的所有路径权限都放到数组中
        let children = r(menu.id)
        menu.children = children.length ? children : null
        return true
      }
    })
  }
  return { menuL: r(-1), authL: arr }
}

// 然后在router的所有权限列表中，匹配当前用户可以访问的权限列表
// 生成动态路由
let getNeedRoutes = (auth) => { //['cart','cart-list'....]
  function r(authRoutes) {
    return authRoutes.filter(route => {
      if (auth.includes(route.name)) {
        if (route.children) { //如果有儿子
          //找到儿子继续看子路由的权限
          route.children = r(route.children)
        }
        return true; //有权限就返回
      }
    })
  }
  return r(authRoutes);
}

export default new Vuex.Store({
  state: {
    // 存放菜单权限数据
    menuList: [],
    authList: [],
    // 原本只要判断menuList.length是否不为空就能判定是否已经获取过menuList，
    // 但如果后台返回空数组咋办？所以此处还需要一个hasRules变量来标识是否已获取
    // 做法就是，获取完毕后，把hasRules改为true
    hasRules: false,
  },
  mutations: {
    set_menuList(state, m) {
      state.menuList = m
    },
    set_authList(state, a) {
      state.authList = a
      state.hasRules = true
    }
  },
  actions: {
    async getMenuList({ commit }) {
      let { data } =await axios.get('http://localhost:3000/role')
      let { menuL, authL } = formatMenuList(data.menuList)
      console.log(menuL, authL)
      commit('set_menuList', menuL)
      commit('set_authList', authL)
    },
    async getAuthRoute({ commit, state }) {
      // 最后把当前需要动态添加的路由返回出去
      let r = getNeedRoutes(state.authList)
      return r
    }
  }
})
