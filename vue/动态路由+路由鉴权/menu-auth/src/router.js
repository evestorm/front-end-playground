import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

// 默认路由列表：不需要权限就能访问的
let defaultRoutes = [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '*',
    component: () => import('@/views/404.vue')
  }
]

// 需要权限才能访问的路由列表
export let authRoutes = [{
    path: '/cart',
    name: 'cart',
    //使用懒加载，当使用这个组件的时候再加载资源，当组件资源较大时，不建议使用，可能会出现白屏现象
    //而且最好使用绝对路径，@是绝对路径的意思,相当于src下
    component: () => import('@/components/menu/cart.vue'),
    //配置子路由
    children: [{
      //当配置子路由时，最好不要在前面加'/',比如:'/cart-list'
      path: 'cart-list',
      name: 'cart-list',
      component: () => import('@/components/menu/cart-list.vue'),
      //配置子路由
      children: [{
          path: 'lottery',
          name: 'lottery',
          component: () => import('@/components/menu/lottery.vue')
        },
        {
          path: 'product',
          name: 'product',
          component: () => import('@/components/menu/product.vue')
        }
      ]
    }]
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/components/menu/profile.vue')
  },
  {
    path: '/shop',
    name: 'shop',
    component: () => import('@/components/menu/shop.vue')
  }
]

// 需要查看当前用户权限来动态添加路由
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  // 默认所有用户可访问的路由，其他需要权限的动态在 main.js 中动态装载给当前router对象
  routes: defaultRoutes
})
