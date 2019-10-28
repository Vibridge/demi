import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './plugins/element.js'
import tim from '../src/libs/im'
import TIM from 'tim-js-sdk'
window.tim = tim
window.TIM = TIM
Vue.config.productionTip = false
Vue.prototype.tim = tim
Vue.prototype.TIM = TIM
Vue.prototype.$store = store



new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
