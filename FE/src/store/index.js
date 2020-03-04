import Vue from 'vue'
import Vuex from 'vuex'
import getters from './gettters'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {}
  },
  mutations: {
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    },
  },
  actions: {
  },
  modules: {
  },
  getters
})
