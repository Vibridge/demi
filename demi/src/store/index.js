import Vue from 'vue';
import Vuex from 'vuex';
import conversation from './module/conversation'
import user from './module/user'
import {Message} from 'element-ui'
import app from './module/app';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    current: Date.now(), // 当前时间
    intervalID: 0,
    message: undefined
  },
  mutations: {
    startComputeCurrent(state) {
      state.intervalID = setInterval(() => {
        state.current = Date.now()
      }, 1000)
    },
    stopComputeCurrent(state) {
      clearInterval(state.intervalID);
      state.intervalID = 0
    },
    showMessage(state, options) {
      if (state.message) {
        state.message.close()
      }
      state.message = Message({
        message: options.message,
        type: options.type || 'success',
        duration: options.duration || 2000,
        offset: 40
      })
    }
  },
  actions: {},
  modules: {
    app,
    conversation,
    user
  }
});
