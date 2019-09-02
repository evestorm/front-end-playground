import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import iView from 'iview'
import 'iview/dist/styles/iview.css'
Vue.use(iView)

Vue.config.productionTip = false

// 不需要登录就能访问的白名单
let whiteList = ['/xxx']
// 全局校验jwt
router.beforeEach(async (to, from, next) => {
  // 白名单免校验
  if (whiteList.includes(to.path)) {
    return next()
  }
  // 发请求给后端校验jwt
  let isLogin = await store.dispatch('validate')
  let needLogin = to.matched.some(match => match.meta.needLogin)
  if (needLogin) { // 如果需要登录
    if (isLogin) { // 并且登录了
      next()
    } else {
      next('/login')
    }
  } else {
    if (isLogin && to.name === 'login') {
      next('/')
    } else {
      next()
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
