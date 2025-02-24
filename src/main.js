import Vue from 'vue';
import App from './App.vue';
// import '@/permission'; // permission control
import router from './router';
import store from './store';
import '@/assets/css/reset.less'; // 自定义样式
import '@/utils/directives'; // 自定义指令
import 'babel-polyfill';
import 'normalize.css/normalize.css'

import $ from 'jquery';
window.$ = $; 
import 'jquery-ui/themes/base/all.css'; // 根据需要选择主题
import 'jquery-ui/dist/jquery-ui.min.js'; // 引入jQuery UI
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import '@fortawesome/fontawesome-free/css/all.css'

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false;
export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
