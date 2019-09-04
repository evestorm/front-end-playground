# 测试 vuex

官网教程：[Vue Test Utils](https://vue-test-utils.vuejs.org/zh/guides/#%E5%9C%A8%E7%BB%84%E4%BB%B6%E4%B8%AD%E6%B5%8B%E8%AF%95-vuex)

## Store.vue

```html
<template>
    <div>
        <span>{{this.$store.state.username}}</span>
        <button @click="clickMe">点击</button>
    </div>
</template>
<script>
// 测试 vuex 从两个方向 测试ui 测试功能
import { mapState, mapActions } from 'vuex'
export default {
    computed:{
        ...mapState(['username'])
    },
    methods:{
        ...mapActions(['set_username']),
        clickMe() {
            this['set_username']('bilibili')
        }
    }
}
</script>
```

## store.js

```js
export default {
  state: {
    username: 'lance'
  },
  mutations: {
    set_username(state, username) {
      state.username = username
    }
  },
  actions: {
    set_username({commit},username){
      commit('set_username',username)
    }
  }
}
```

## main.js

```js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import config from './store'
import Vuex from 'vuex'

Vue.use(Vuex)
let store = new Vuex.Store(config)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```

## store.spec.js

```js
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Store from '@/components/Store.vue'

let localVue = createLocalVue()
localVue.use(Vuex)//防止用例之间的污染
let state
let store
let actions
let callback=jest.fn()
describe('测试vuex 能否在页面中使用',()=>{
    state = { username:'lance' }
    actions = {
        set_username: callback
    }
    beforeEach(() => {
        state = { username:'lance' }
        store=new Vuex.Store({
            state,
            actions
        })
    })
    it('state能否正常显示到页面中', ()=>{
        let wrapper=shallowMount(Store,{
            localVue,
            store
        })
        expect(wrapper.text()).toContain('lance')
    })
    it('点击按钮时action能否正常触发', () => {
        let wrapper = shallowMount(Store, {
            localVue, // 提供测试的构造函数vue
            store
        })
        wrapper.find('button').trigger('click')
        expect(callback).toHaveBeenCalled()
    })
})
```

将store中的部分内容放到main.js中可以改造得更简洁

```js
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import config from '@/store'
let localVue = createLocalVue()
localVue.use(Vuex)//防止用例之间的污染

describe('测试vuex 能否在页面中使用',()=>{
    let store;
    beforeEach(()=>{
        store = new Vuex.Store(config)
    })
    it('state能否正常显示到页面中',()=>{
        expect(store.state.username).toBe('lance')
        jest.useFakeTimers() // 创建一个模拟的定时器，会把异步代码立刻返回
        store.dispatch('set_username', 'newName')
        jest.runAllTimers() // 把timer执行
        expect(store.state.username).toBe('newName')
        jest.useRealTimers() // 变回真实的timer
    })
})
```
