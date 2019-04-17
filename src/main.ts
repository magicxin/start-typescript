import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import Vant from 'vant';
import axios from 'axios';
// require styles
import '@/css/normalize.css';
import '@/css/reset.css';
import 'swiper/dist/css/swiper.css'; // 轮播组件
import 'vant/lib/index.css';

Vue.config.productionTip = false;
// use
Vue.use(VueAwesomeSwiper /* { default global options } */);
Vue.use(Vant);
// mock 数据
const mock = true;
if (process.env.NODE_ENV === 'development' && mock) {
  import('mockjs').then((res) => {
    Vue.prototype.$mock = res;
    import('@/mock');
    init();
  });
} else {
  init();
}

function init() {
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app');
}

