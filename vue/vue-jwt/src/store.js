import Vue from 'vue'
import Vuex from 'vuex'
import { login, validate } from './api/user'
import { setLocal } from './libs/local'

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
    setUser(state, username) {
      state.username = username
    }
  },
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
    },
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
})
