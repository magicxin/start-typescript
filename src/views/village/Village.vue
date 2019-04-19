<template>
  <div class="village">
    <load-more :onInfinite="onInfinite">
      <swiper :options="swiperOption" :autoplay="true">
        <swiper-slide class="swiper-slide">
          <img :src="banner1" />
        </swiper-slide>
        <swiper-slide class="swiper-slide">
          <img :src="banner2" />
        </swiper-slide>
        <swiper-slide class="swiper-slide">
          <img :src="banner2" />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <ul class="tabs clearfix">
        <li class="tab" :class="active === index ? 'blue' : ''" v-for="(item,index) in tabs" :key="index" @click="changeActive(index)">
          <img :src="item.icon"/>
          <span>{{ item.name }}</span>
        </li>
      </ul>
      <router-view></router-view>
      <div v-if="true" slot="infinite" class="text-center">没有更多数据</div>
    </load-more>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import loadMore from '@/components/load-more.vue';
  import EventBus from '@/utils/eventBus';
  import dynamic from '@/assets/dynamic.png';
  import routine from '@/assets/routine.png';
  import party from '@/assets/party.png';
  import situation from '@/assets/situation.png';
  import chat from '@/assets/chat.png';
  import phone from '@/assets/phone.png';
  import pedia from '@/assets/pedia.png';
  import banner1 from '@/assets/banner1.png';
  import banner2 from '@/assets/banner2.png';
  
  Component.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'beforeRouteUpdate', // for vue-router 2.2+
  ]);
  
  @Component({components: { loadMore }})
  export default class Village extends Vue {
    // swiper 设置选项
    private banner1: string = banner1;
    private banner2: string = banner2;
    private swiperOption: object = {
      pagination: {
        el: '.swiper-pagination',
      },
      autoplay: true,
    };
    // 当前选中 tab
    private active: number = 0;
    private tabs: any[] = [{
      icon: dynamic,
      name: '乡村动态',
      route: '/village/dynamic',
    }, {
      icon: party,
      name: '党建之家',
      route: '/village/party_home',
    }, {
      icon: routine,
      name: '乡村振兴',
      route: '/village/revive',
    }, {
      icon: situation,
      name: '生态产业',
      route: '/village/production',
    }, {
      icon: chat,
      name: '乡村趣谈',
      route: '/village/fun_chat',
    }];
    // 监听路由
    @Watch('route')
    private onRouteChange(to: object, from: object, next: any) {
      const a = 1;
    }
    // 监听 active 变化
    @Watch('active')
    private onActiveChange(val: number, oldVal: number) {
      const name = this.tabs[val].route;
      this.$router.push(name);
    }
    // json 结构和 vue 实例暂时写为 any 类型
    private beforeRouteEnter(to: any, from: any, next: any) {
      next((vm: any) => {
        vm.setActive(to.path);
      });
    }
    private mounted() {
      const a = 3;
    }
    private setActive(name: string) {
      if (name === '/village/dynamic') {
        this.active = 0;
      }
      if (name === '/village/party_home') {
        this.active = 1;
      }
      if (name === '/village/revive') {
        this.active = 2;
      }
      if (name === '/village/production') {
        this.active = 3;
      }
      if (name === '/village/fun_chat') {
        this.active = 4;
      }
    }
    private changeActive(i: number) {
      this.active = i;
    }
    private onInfinite(done: any) {
      EventBus.$emit('onInfinite', done);
    }
  }
</script>

<style lang="scss">
  .village {
    .swiper-slide {
      height: 140px;
      img {
        width: 100%;
      }
    }
    .tabs {
      padding-top:1rem;
      background:#fff;
    }
  .tab {
    width:20%;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    float:left;
    margin-bottom:1rem;
    img {
      width:40px;
      height:40px;
    }
    span {
      padding-top:.2rem;
    }
  }
  .blue {
    color:#00a4bd;
    font-weight: bold;
  }
  }
  .scroll {
    background:#efeff4;
  }
</style>