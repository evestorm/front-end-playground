import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV != 'production', // 校验更改状态的合法性
  state,
  getters,
  mutations,
  actions,
  modules: {
    user
  }
})