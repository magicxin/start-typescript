<template>
  <div class="pedia">
    <van-tabs type="card">
      <van-tab title="专家讲座">
        <div class="videos clearfix">
          <div class="lesson" v-for="(item,index) in dynamics">
            <img :src="item.images[0]"/>
            <span class="title">{{ item.title }}</span>
            <div class="foot">
              <span>{{ item.times }}</span>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="农技知识">
        <div class="knowlage">
          <div class="knowlage-item">
            <div class="left">
              <span class="title">asdsadas爱是飞洒发是</span>
              <div class="foot">
                <span>32次观看</span>
              </div>
            </div>
            <!--<img class="right" :src="demo"/>-->
          </div>
        </div>
      </van-tab>
    </van-tabs>
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
  export default class Pedia extends Vue {
    private dynamics: DynamicInterface[] = [];
    private id: number = 14; // 栏目 id
    private pageRows: number = 8; // 每页展示条数
    private page: number = 0; // 第几页
    private total: number = 0;
    private busy: boolean = true;
    private mounted() {
      this.getDynamic({columnId: this.id, pageRows: this.pageRows, page: this.page++}).then((res) => {
        // 是否需要确定参数类型
        this.dynamics = res.result as DynamicInterface[];
        this.total = res.total;
      });
    }
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
  .pedia {
    margin-top:1rem;
    background:#fff;
    padding:1rem;
    .videos {
      padding:1rem 0;
    }
    .lesson {
      width:50%;
      float:left;
      display:flex;
      flex-direction: column;
      padding:.2rem;
      .title {
        font-size:1.2rem;
        margin-top:.4rem;
      }
      .foot {
        color:#999999;
      }
    }
    .knowlage {
      .knowlage-item {
        display:flex;
        padding:1rem 0;
        border-bottom: 1px solid #dddddd;
        .left {
          flex:2;
          display:flex;
          flex-direction: column;
          justify-content: space-between;
          .title {
            font-size:1.2rem;
            margin-top:.4rem;
          }
          .foot {
            color:#999999;
          }
        }
        .right {
          flex:1;
          margin-left:1rem;
        }
      }
    }
    .van-tabs__nav--card .van-tab.van-tab--active {
      color:#fff;
      background:#00a4bd;
    }
    .van-tabs__nav--card .van-tab {
      color:#00a4bd;
    }
    .van-tabs__nav--card {
      border: 1px solid #00a4bd;
    }
    .van-tabs__nav--card .van-tab {
      border-right: none;
    }
  }
</style>