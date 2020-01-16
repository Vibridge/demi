import Vue from 'vue'
import './plugins/axios'
import './plugins/vue-fullpage'
import App from './App.vue'
import router from './router'
import store from './store/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './libs/axios'
import Avatar from './views/IM/avatar.vue'
import Avatars from './views/IM/avatars.vue'
import './assets/icon/iconfont.css'
import './assets/icon/tim.css'
import config from './config';
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor);
Vue.use(ElementUI);
import tim from '../src/libs/im'
import TIM from 'tim-js-sdk'
window.tim = tim;
window.TIM = TIM;
window.store = store
Vue.prototype.$bus = new Vue(); // event Bus 用于无关系组件间的通信。
Vue.prototype.$config = config;
Vue.config.productionTip = false;
Vue.prototype.tim = tim;
Vue.prototype.TIM = TIM;
Vue.prototype.$store = store;
Vue.component('avatar', Avatar)
Vue.component('avatars', Avatars)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
