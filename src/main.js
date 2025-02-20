import Vue from 'vue';
import App from './App.vue';
// import '@/permission'; // permission control
import router from './router';
import store from './store';
import '@/assets/css/index.css'; // 默认主题

import '@/assets/css/reset.less'; // 自定义样式
// import '@/assets/icons/iconfont.css';
// import '@/common/less/main.less';
// import '@/common/less/index.less';
import '@/utils/directives'; // 自定义指令
import 'babel-polyfill';
import 'normalize.css/normalize.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


Vue.config.productionTip = false;
export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
