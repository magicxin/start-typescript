<template>
  <div class="situation">
    <template v-for="(item, index) in dynamics">
      <dynamic-item :dynamic="item" @tap="tap(item)" @scan="scan(item)"></dynamic-item>
    </template>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import axios from '@/utils/rest';
  import dynamicItem from '@/components/dynamic-item.vue';
  import avatar from '@/assets/1.png';
  import DynamicInterface from '@/interface/dynamic';
  import uris from '@/utils/uris';
  import EventBus from '@/utils/eventBus';
  
  @Component({components: { dynamicItem }})
  export default class Situation extends Vue {
    private dynamics: DynamicInterface[] = [];
    private mounted() {
      EventBus.$on('onInfinite', (done: any) => {
        const a = 1;
      });
      this.getDynamic().then((res) => {
        // 是否需要确定参数类型
        this.dynamics = res as DynamicInterface[];
      });
    }
    // 暂时不明确传参
    private getDynamic(params?: any) {
      return new Promise((resolve, reject) => {
        axios.$get(uris.getDynamic, params).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    }
    private tap(item: DynamicInterface) {
      this.$router.push({
        name: 'detail',
      });
    }
    private scan(item: DynamicInterface) {
      const a = 1;
    }
  }
</script>

<style lang="scss">
  .situation {
    
  }
</style>