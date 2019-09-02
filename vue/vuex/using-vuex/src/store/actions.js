export default {
  asyncSetUsername({ commit }, payload) {
    setTimeout(() => {
      commit('setUsername', payload)
    }, 2000);
  }
}