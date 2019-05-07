<template>
  <div class="dynamic" v-infinite-scroll="loadMore" :infinite-scroll-disabled="busy">
    <template v-for="(item, index) in dynamics">
      <dynamic-item :dynamic="item" @tap="tap(item.id)"></dynamic-item>
      <card-foot :times="item.times"></card-foot>
    </template>
    <!--加载完成 -->
    <div class="loaded" v-if="page - total >= -1">暂无更多数据</div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import axios from '@/utils/rest';
  import dynamicItem from '@/components/dynamic-item.vue';
  import cardFoot from '@/components/card-foot.vue';
  import avatar from '@/assets/1.png';
  import DynamicInterface from '@/interface/dynamic';
  import uris from '@/utils/uris';
  import EventBus from '@/utils/eventBus';
  import { makeData } from '@/controller/dynamic';
  
  @Component({components: { dynamicItem, cardFoot }})
  export default class Dynamic extends Vue {
    private dynamics: DynamicInterface[] = [];
    private id: number = 2; // 栏目 id
    private pageRows: number = 5; // 每页展示条数
    private page: number = 0; // 第几页
    private total: number = 0;
    private busy: boolean = true;
    private mounted() {
//    EventBus.$on('onInfinite', (done: any) => {
//      if (this.page - this.total >= -1) {
//          this.$root.loaded = true;
//        return;
//      }else {
//        this.page++
//      }
//      this.getDynamic({columnId: this.id, pageRows: this.pageRows, page: this.page}).then((res) => {
//        // 是否需要确定参数类型
//        this.dynamics = this.dynamics.concat(res.result as DynamicInterface[]);
//        done();
//      });
//    });
    }
    private loadMore() {
      this.busy = true;
      if (this.total > 0 && this.page - this.total >= -1) {
        return;
      }
      this.getDynamic({columnId: this.id, pageRows: this.pageRows, page: this.page++, isOpen: 1}).then((res) => {
        // 是否需要确定参数类型
        this.dynamics = this.dynamics.concat(res.result as DynamicInterface[]);
        this.total = res.total;
        this.busy = false;
      });
    }
    // 暂时不明确传参
    private getDynamic(params?: any) {
      return new Promise((resolve, reject) => {
        axios.$get(uris.getDynamic, {params: params}).then((res) => {
          resolve(makeData.bind(this)(res));
        }).catch((err) => {
          reject(err);
        });
      });
    }
    private tap(id: number) {
      this.$router.push({
        name: 'detail',
        params: {
          _id: id,
        },
      });
    }
  }
</script>

<style lang="scss">
  .dynamic {
    padding-top:.1rem;
    background:#efeff4;
    .loaded {
      color:#DCDCDC;
      padding:.6rem;
      text-align: center;
      background:#F4F4F4;
    }
  }
</style>