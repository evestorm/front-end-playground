import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

// 懒加载
function LoadView(componentName) {
  return () => import(`./views/${componentName}.vue`)
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/profile',
      name: 'profile',
      component: LoadView('Profile'),
      meta: {
        needLogin: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoadView('Login')
    }
  ]
})
