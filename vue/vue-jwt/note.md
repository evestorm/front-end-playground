# 在 Vue 中使用 jwt

## 项目初始化

创建项目：

```shell
vue create vue-jwt
// 插件选择 babel / vue-router / vuex
cd vue-jwt
```

安装 iview 和 axios：

```shell
npm install iview axios
```

- 使用 iview 帮助我们搭建UI
- 使用 axios 发起 ajax 请求

安装 express 、body-parser 和 jsonwebtoken：

```shell
npm install body-parser jsonwebtoken
```

- 使用 express 搭建后端（vue已默认集成，不用自己装）
- 使用 body-parser 解析请求
- 使用 jsonwebtoken 生成 jwt 来鉴权登录

移除不需要内容：

- src/components/ 下所有组件
- src/views/ 下 About.vue 页面
- src/App.vue 中有关 About.vue 的所有代码
- src/router.js 中有关 About.vue 的所有代码

## 添加项目所需页面

我们希望等会一共有三个页面：「首页」「登录页」「个人中心页」。

然后「个人中心页」需要登录才能进入，否则跳转到「登录页」。

> Login.vue

```html
<template>
  <div>
    <h1>Login</h1>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" scoped>

</style>
```

> Profile.vue

```html
<template>
  <div>
    <h1>个人中心</h1>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" scoped>

</style>
```

### 更新路由列表

> src/router.js

```js
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
      component: LoadView('Profile')
    },
    {
      path: '/login',
      name: 'login',
      component: LoadView('Login')
    }
  ]
})
```

### 添加路由Link

> App.vue

```html
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> | 
      <router-link to="/profile">Profile</router-link> | 
      <router-link to="/login">Login</router-link>
    </div>
    <router-view/>
  </div>
</template>
```

## 配置 iView 插件

> src/main.js

```js
...
import iView from 'iview'
import 'iview/dist/styles/iview.css'
Vue.use(iView)
...
```

### 测试效果

> Login.vue

```html
<template>
  <div>
    <h1>登录</h1>
    <Input type="text" placeholder="请输入用户名" style="width: 300px"/>
    <Button type="primary">登录</Button>
  </div>
</template>
```

## 编写一个简单的 express 服务器

项目根目录下新建 `server.js`：

```js
const express = require('express')

const app = express()

const bodyParser = require('body-parser')

// 解决跨域【express跨域】
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.header('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  if (req.method.toLowerCase() === 'options') {
    return res.end()
  }
  next()
})

app.use(bodyParser.json())

app.get('/user', (req, res) => {
  res.json({name: 'Lance'})
})

app.listen(3000)
```

终端新开窗口cd到项目根目录，使用 `nodemon server.js` 启动服务。

## 封装 axios

在 `src` 下新建 `libs` 专门存放自己写的类库，并创建 `ajaxRequest.js` 文件：

```js
// ajaxRequest 获取
import axios from 'axios'

class AjaxRequest {
  constructor() {
    this.baseURL = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:3000'
    this.timeout = 3000
  }
  merge(options) {
    return {...options, baseURL: this.baseURL, timeout: this.timeout}
  }
  request(options) {
    let instance = axios.create() // 通过axios库创建一个axios实例
    let config = this.merge(options)
    return instance(config) // axios执行后返回的是一个promise
  }
}

export default new AjaxRequest

// 外界如何使用：
// import ajax from "./ajaxRequest"
// ajax.request({
//   url: 'xxx',
//   method: 'xxx'
// }).then()
```

## 配置API请求

在 `src` 下新建 `api` 文件夹，创建 `user.js` 文件，专门用来配置用户相关的API：

```js
import axios from '../libs/ajaxRequest'

// 配置user接口
export const getUser = () => {
  return axios.request({
    url: '/user',
    method: 'get'
  })
}
```

## Home 下发起 ajax 请求

> src/views/Home.vue

```html
<template>
  <div class="home">
    当前登录用户名：
  </div>
</template>

<script>
// @ is an alias to /src
import { getUser } from '../api/user'
export default {
  name: 'home',
  async mounted() {
    let res = await getUser()
    console.log(res)
  },
  components: {
  }
}
</script>

```

## 添加loading动画

首先把loading状态保存到vuex的state，然后在mutations中添加两个修改状态的方法：

> src/store.js

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isShowLoading: false,
    username: ''
  },
  mutations: {
    showLoading(state) {
      state.isShowLoading = true
    },
    hideLoading(state) {
      state.isShowLoading = false
    }
  },
  actions: {

  }
})
```

回到 `src/libs/ajaxRequest.js` 文件，在请求和响应拦截中添加和移除loading动画。另外，为了简化请求后的拿到的数据结果，我们在响应拦截中直接获取 data 字段并返回：

```js
// ajaxRequest 获取
import axios from 'axios'
import store from '../store'

// 当第一次请求 显示loading 剩下的时候就不调用了
// 当都请求完毕后，隐藏loading
class AjaxRequest {
  constructor() {
    this.baseURL = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:3000'
    this.timeout = 3000
    this.queue = {} // 存放请求队列
  }
  merge(options) {
    return {...options, baseURL: this.baseURL, timeout: this.timeout}
  }
  setInterceptor(instance, url) {
    // 一般请求拦截器中干下面两件事：
    // 1. 更改请求头（比如添加jwt）
    // 2. 添加loading效果
    instance.interceptors.request.use(config => {
      config.headers.Authorization = 'xxx' // 临时硬编码，等会改为jwt
      // 保证第一次请求 显示loading
      if (Object.keys(this.queue).length === 0) {
        store.commit('showLoading')
      }
      this.queue[url] = url
      return config
    })
    // 如果上一个promise返回了一个常量，会作为下一个promise的输入
    instance.interceptors.response.use(res => {
      delete this.queue[url] // 每次请求成功后，就从队列中删除该请求url
      // 当都请求完毕后，再隐藏loading
      if (Object.keys(this.queue).length === 0) {
        store.commit('hideLoading')
      }
      return res.data
    })
  }
  request(options) {
    let instance = axios.create() // 通过axios库创建一个axios实例
    // 拦截器
    this.setInterceptor(instance, options.url)
    let config = this.merge(options)
    return instance(config) // axios执行后返回的是一个promise
  }
}

export default new AjaxRequest
```

## 实现登录

### 在 vuex 中添加 username

> src/store.js

```js
state: {
  isShowLoading: false,
  username: ''
},
```

### 完善 `server.js`

改 `getUser` 为 `login` ，并在请求成功后返回token：

```js
const express = require('express')

const app = express()

const bodyParser = require('body-parser')

let jwt = require('jsonwebtoken')

// 解决跨域【express跨域】
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.header('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  if (req.method.toLowerCase() === 'options') {
    return res.end()
  }
  next()
})

app.use(bodyParser.json())

app.post('/login', (req, res) => {
  let { username } = req.body
  if (username === 'admin') {
    res.json({
      code: 0,
      username: 'admin',
      // 三个参数：payload, 秘钥，{过期时间}
      token: jwt.sign({username: 'admin'}, 'lance', {
        expiresIn: 20
      })
    })
  } else {
    res.json({
      code: 1,
      data: '用户名不存在'
    })
  }
})

app.listen(3000)
```

### 编写前端调用接口

> src/api/user.js

```js
...
export const login = (username) => {
  return axios.request({
    url: '/login',
    method: 'post',
    data: {
      username
    }
  })
}
```

### 在 vuex 的 actions 中发起 login 异步请求

> src/store.js

```js
import Vue from 'vue'
import Vuex from 'vuex'
import { login } from './api/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isShowLoading: false,
    username: ''
  },
  mutations: {
    showLoading(state) {
      state.isShowLoading = true
    },
    hideLoading(state) {
      state.isShowLoading = false
    },
    // 设置用户状态
    setUser(state, username) {
      state.username = username
    }
  },
  // 存放着接口调用
  actions: {
    async toLogin({ commit }, username) {
      let res = await login(username)
      if (res.code === 0) { // 成功登录
        commit('setUser', res.username)
      } else {
        return Promise.reject(res.data)
      }
    }
  }
})
```

### 登录页发起登录请求

> src/views/Login.vue

```html
<template>
  <div>
    <h1>登录</h1>
    <Input type="text" v-model="username" placeholder="请输入用户名" style="width: 300px"/>
    <Button type="primary" @click="login">登录</Button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
  export default {
    data() {
      return {
        username: ''
      }
    },
    methods: {
      ...mapActions(['toLogin']),
      login() {
        this['toLogin'](this.username).then(data => {
          this.$router.push('/')
        }, err => {
          this.$Message.error(err)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
```

然后在 `src/views/Home.vue` 中获取 store 中存储的 username ，然后移除已删除的 getUser 请求相关代码：

```html
<template>
  <div class="home">
    当前登录用户名：{{$store.state.username}}
  </div>
</template>

<script>
// @ is an alias to /src
import { getUser } from '../api/user'
export default {
  name: 'home',
  async mounted() {
    // let res = await getUser()
    // console.log(res)
  },
  components: {
  }
}
</script>
```

现在其实我们已经实现了一个简单的前后端jwt登录流程。然而当我们刷新页面 token 就会消失。所以通常我们还会在本地保存一份 token 。

### 本地存储

在 `src/libs/` 下新建一个 `local.js` 文件：

```js
export const setLocal = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  localStorage.setItem(key, value)
}

export const getLocal = key => {
  return localStorage.getItem(key)
}
```

### 在 vuex 中将 jwt 存储到本地

> src/store.js

```js
import Vue from 'vue'
import Vuex from 'vuex'
import { login } from './api/user'
import { setLocal } from './libs/local'

Vue.use(Vuex)

export default new Vuex.Store({
  ...
  // 存放着接口调用
  actions: {
    // async 返回一个promise，让组件中调用dispatch后可以.then
    async toLogin({ commit }, username) {
      let res = await login(username)
      if (res.code === 0) { // 成功登录
        commit('setUser', res.username)

        // 将 token 保存到客户端上，每次请求时带上 token ，服务端校验 token ，
        // 如果 token 不正确或过期，跳转登录页
        setLocal('token', res.token)
      } else {
        return Promise.reject(res.data)
      }
    }
  }
})
```

### 在 `ajaxRequest.js` 的请求拦截中获取 jwt

```js
...
import { getLocal } from '../libs/local'

class AjaxRequest {
  ...
  setInterceptor(instance, url) {
    instance.interceptors.request.use(config => {
      // 获取 token
      config.headers.Authorization = getLocal('token')
      ...
    })
    ...
  }
  ...
}

export default new AjaxRequest
```

### 全局导航守卫中判定登录状态

> src/main.js

```js
...
// 全局校验jwt
router.beforeEach((to, from, next) => {
  // 发请求给后端校验jwt
  next()
})
...
```

下面回到 `server.js` 后端来编写校验API：

```js
...

// 提取秘钥（因为 validate 中也要使用）
let secret = 'lance'

app.post('/login', (req, res) => {
  let { username } = req.body
  if (username === 'admin') {
    res.json({
      code: 0,
      username: 'admin',
      // 三个参数：payload, 秘钥，{过期时间}
      token: jwt.sign({username: 'admin'}, secret, {
        expiresIn: 20
      })
    })
  } else {
    res.json({
      code: 1,
      data: '用户名不存在'
    })
  }
})

app.get('/validate', (req, res) => {
  let token = req.headers.authorization
  jwt.verify(token, secret, (err, decode) => { // decode => {username: 'admin'}
    if (err) { // token有错或token失效
      return res.json({
        code: 1,
        data: 'token失效了'
      })
    } else {
      res.json({ // 淘宝登陆后 离开30分钟 登录状态失效（给token续命）
        // 需要把token的时效延长
        code: 0,
        username: decode.username,
        token: jwt.sign({username: 'admin'}, secret, {
          expiresIn: 20
        })
      })
    }
  })
})

app.listen(3000)
```

然后在前端 `src/api/user.js` 中配置 validate 接口：

```js
...
export const validate = username => {
  return axios.request({
    url: '/validate',
    method: 'get'
  })
}
```

在 `src/store.js` 中编写异步actions校验token：

```js
actions: {
  ...
  async validate({ commit }) {
    let res = await validate()
    if (res.code === 0) {
      commit('setUser', res.username)
      setLocal('token', res.token)
    }
    // 返回用户登录是否失效
    return res.code === 0
  }
}
```

为了等会验证效果，我们把 profile 页面的权限升级为登录才能访问：

> src/router.js

```js
{
  path: '/profile',
  name: 'profile',
  component: LoadView('Profile'),
  meta: {
    needLogin: true
  }
},
```

再回到 `src/main.js` 中继续编写全局守卫钩子函数：

```js
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
```
