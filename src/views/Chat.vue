<template>
  <div class="chat" v-infinite-scroll="loadMore" :infinite-scroll-disabled="busy">
    <template v-for="(item, index) in dynamics">
      <dynamic-item :dynamic="item" @tap="tap(item)"></dynamic-item>
      <div class="comment-list">
        <div class="visiting-card">
          <img :src="publish"/>
            <div class="right">
              <div class="top">
                <span class="author">1</span>
                <img :src="publish" />
                <span class="where">222</span>
              </div>
              <span class="datetime">333</span>
            </div>
        </div>
      </div>
    </template>
    <div class="publish" @click="$router.push('publish')">
      <img :src="publish" />
      <!--<span>发布</span>-->
    </div>
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
  import publish from '@/assets/publish.png';
  
  @Component({components: { dynamicItem, cardFoot }})
  export default class Chat extends Vue {
    private dynamics: DynamicInterface[] = [];
    private publish: string = publish;
    private id: number = 16; // 栏目 id
    private pageRows: number = 5; // 每页展示条数
    private page: number = 0; // 第几页
    private total: number = 0;
    private busy: boolean = true;
    private loadMore() {
      this.busy = true;
      if (this.total > 0 && this.page - this.total >= -1) {
        return;
      }
      this.getDynamic({columnId: this.id, pageRows: this.pageRows, page: this.page++}).then((res) => {
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
    private tap(item: DynamicInterface) {
      
    }
  }
</script>

<style scoped lang="scss">
  .chat {
    padding-top:.1rem;
    background:#efeff4;
    .publish {
      position: fixed;
      z-index: 9999;
      left: 50%;
      transform: translate(-50%, 50%);
      bottom: 2rem;
      img {
        width:40px;
        height:40px;
      }
      span {
        background:#fff;
      }
    }
    .loaded {
      color:#DCDCDC;
      padding:.6rem;
      text-align: center;
      background:#F4F4F4;
    }
    .comment-list {
      background:#fff;
    }
    .visiting-card {
      display:flex;
      align-items:center;
      padding:.6rem 0;
    img {
      width:36px;
      height:36px;
      border-radius: 18px;
      margin-right:.8rem;
    }
    .top {
      display: flex;
      align-items: center;
      img {
        width:10px;
        height:14px;
      }
    }
    .author {
      margin-right:.6rem;
    }
    .where {
      color:#999999;
      font-size:.9rem;
    }
    .datetime {
      color:#999999;
      font-size:.9rem;
    }
    .right {
      display:flex;
      flex-direction: column;
    }
  }
  }
  
</style>