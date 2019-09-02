import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

// 默认加载首页 其他的组件 在点击时懒加载
// 可能会有白屏

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('_v/Login.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('_v/Profile.vue'),
    },
    {
      path: '/user',
      component: () => import('_v/User.vue'),
      meta: { // 路由元信息
        needLogin: true
      },
      children: [
        {
          path: '', // user默认不显示子路由，设置 path='' 可默认显示此子路由
          component: () => import('_v/userAdd.vue'),
        },
        {
          // 儿子路径默认不能j加/ 
          path: 'add',
          name: 'userAdd',
          component: () => import('_v/userAdd.vue'),
        },
        {
          path: 'profile',
          name: 'userProfile',
          component: () => import('_v/Profile.vue')
        }
      ]
    }
  ]
})
