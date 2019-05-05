import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import Vant from 'vant';
import infiniteScroll from 'vue-infinite-scroll';
import axios from 'axios';
import config from './config';
import VConsole from 'vconsole/dist/vconsole.min.js';
import '@/utils/validate';
import '@/mixins';
import '@/directives';
import getVariable from '@/utils/getVariable';

// require styles
import '@/css/normalize.css';
import '@/css/reset.css';
import 'swiper/dist/css/swiper.css'; // 轮播组件
import 'vant/lib/index.css';

const vConsole = new VConsole()
Vue.config.productionTip = false;
// use
Vue.use(VueAwesomeSwiper /* { default global options } */);
Vue.use(Vant);
Vue.use(infiniteScroll);
// mock 数据
const mock = false;
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
  localStorage.setItem('openid',getVariable('usersign'));
  router.beforeEach((to, from, next) => {
    if (to.name.indexOf('village') > -1) {
      next();
    } else if(to.name.indexOf('detail') > -1) {
      next();
    } else if (localStorage.getItem('village_token') !== '1') {
      if(to.name === 'auth') {
        next();
      } else {
        router.push({name: 'auth', params: {name: to.name}});
      }
    } else {
      next();
    }
  });
  
  new Vue({
    router,
    data(){
      return {
        loaded: false,
      }
    },
    store,
    render: (h) => h(App),
  }).$mount('#app');
}

