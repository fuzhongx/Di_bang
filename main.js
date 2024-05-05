import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'animate.css';
import router from './router/route';

import axios from 'axios';
axios.defaults.baseURL = '/api';
import * as echarts from 'echarts';
window.eventBus = new Vue(); 

Vue.use(ElementUI);
Vue.config.productionTip = false

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
