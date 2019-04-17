import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
// import Dynamic from './views/Dynamic.vue';
// import Routine from './views/Routine.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'dynamic',
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue'),
      children: [{ // 乡村动态
        path: '/dynamic',
        name: 'dynamic',
        component: () => import(/* webpackChunkName: "home" */ './views/Dynamic.vue'),
      }, { // 村务公开
        path: '/routine',
        name: 'routine',
        component: () => import(/* webpackChunkName: "home" */ './views/Routine.vue'),
      }, { // 党建之家
        path: '/party_home',
        name: 'party_home',
        component: () => import(/* webpackChunkName: "home" */ './views/party-home.vue'),
      }, { // 村委概况
        path: '/situation',
        name: 'situation',
        component: () => import(/* webpackChunkName: "home" */ './views/Situation.vue'),
      }, { // 家长里短
        path: '/chat',
        name: 'chat',
        component: () => import(/* webpackChunkName: "home" */ './views/Chat.vue'),
      }, { // 便民电话
        path: '/phone',
        name: 'phone',
        component: () => import(/* webpackChunkName: "home" */ './views/Phone.vue'),
      }, { // 乡村百科
        path: '/pedia',
        name: 'pedia',
        component: () => import(/* webpackChunkName: "home" */ './views/Pedia.vue'),
      }],
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import(/* webpackChunkName: "home" */ './views/Detail.vue'),
    },
  ],
});
