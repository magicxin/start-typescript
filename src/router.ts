import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
// import Dynamic from './views/Dynamic.vue';
// import Routine from './views/Routine.vue';

Vue.use(Router);

export default new Router({
  routes: [{
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
      path: '/detail/:_id',
      name: 'detail',
      component: () => import(/* webpackChunkName: "home" */ './views/Detail.vue'),
    },
    {
      path: '/comment_detail/:_id',
      name: 'comment_detail',
      component: () => import(/* webpackChunkName: "home" */ './views/comment-detail.vue'),
    },
    {
      path: '/village',
      name: 'village',
      component: () => import(/* webpackChunkName: "home" */ './views/village/Village.vue'),
      children: [{ // 乡村动态
        path: '/village/dynamic',
        name: 'village_dynamic',
        component: () => import(/* webpackChunkName: "home" */ './views/village/Dynamic.vue'),
      }, { // 党建之家
        path: '/village/party_home',
        name: 'village_party_home',
        component: () => import(/* webpackChunkName: "home" */ './views/village/party-home.vue'),
      }, { // 乡村振兴
        path: '/village/revive',
        name: 'village_revive',
        component: () => import(/* webpackChunkName: "home" */ './views/village/Revive.vue'),
      }, { // 生态产业
        path: '/village/production',
        name: 'village_production',
        component: () => import(/* webpackChunkName: "home" */ './views/village/Production.vue'),
      }, { // 乡村趣谈
        path: '/village/fun_chat',
        name: 'village_fun_chat',
        component: () => import(/* webpackChunkName: "home" */ './views/village/fun-chat.vue'),
      }],
    }, { // 鉴权
      path: '/auth',
      name: 'auth',
      component: () => import(/* webpackChunkName: "home" */ './views/Auth.vue'),
    },
    { // 发布动态
      path: '/publish',
      name: 'publish',
      component: () => import(/* webpackChunkName: "home" */ './views/Publish.vue'),
    },
    { // 发布评论
      path: '/send',
      name: 'send',
      component: () => import(/* webpackChunkName: "home" */ './views/Send.vue'),
    },
  ],
});
