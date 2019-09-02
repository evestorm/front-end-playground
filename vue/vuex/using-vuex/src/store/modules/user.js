export default {
  namespaced: true, // 开启 独立的命名空间
  state: {
    email: '2333@qq.com'
  },
  getters: {},
  mutations: {
    setEmail(state, payload) {
      state.email = payload
    }
  }
}