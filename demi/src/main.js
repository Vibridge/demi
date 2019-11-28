import Vue from 'vue'
import './plugins/axios'
import './plugins/vue-fullpage'
import App from './App.vue'
import router from './router'
import store from './store/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './libs/axios'
Vue.use(ElementUI);

import tim from '../src/libs/im'
import TIM from 'tim-js-sdk'
window.tim = tim;
window.TIM = TIM;
Vue.prototype.$bus = new Vue(); // event Bus 用于无关系组件间的通信。
Vue.config.productionTip = false;
Vue.prototype.tim = tim;
Vue.prototype.TIM = TIM;
Vue.prototype.$store = store;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
