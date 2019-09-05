import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.config.productionTip = false

// 只要页面切换就执行的钩子
router.beforeEach(async (to, from, next) => {
  // 判断当前有没有获取过权限，如果获取过了，就不要再获取了
  if (!store.state.hasRules) {
    //获取权限，调用获取权限的接口，去action中获取数据
    await store.dispatch('getMenuList')
    // 拿到动态生成的路由列表
    let r = await store.dispatch('getAuthRoute')
    // 添加到当前路由中
    router.addRoutes(r)
    // next({...to, replace: true}) // hack 为了保证addRoute添加成功后再跳转，replace是为了防止跳转到 /cart 后再次跳转到 /cart，所以使用替换模式，类似于 history.replace
    next()
  } else {
    //如果已经获取了权限就可以访问页面了
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
