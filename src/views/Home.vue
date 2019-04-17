<template>
  <div class="home">
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
  
  @Component({components: { loadMore }})
  export default class Home extends Vue {
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
      route: 'dynamic',
    }, {
      icon: routine,
      name: '村务公开',
      route: 'routine',
    }, {
      icon: party,
      name: '党建之家',
      route: 'party_home',
    }, {
      icon: situation,
      name: '村委概况',
      route: 'situation',
    }, {
      icon: chat,
      name: '家长里短',
      route: 'chat',
    }, {
      icon: phone,
      name: '便民电话',
      route: 'phone',
    }, {
      icon: pedia,
      name: '乡村百科',
      route: 'pedia',
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
    private mounted() {
      const a = 3;
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
  .home {
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
    width:25%;
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