import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { store } from '@/assets/store';
import 'vant/lib/index.css';

Vue.config.productionTip = false;
Vue.prototype.$store = store;
const vue = new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
