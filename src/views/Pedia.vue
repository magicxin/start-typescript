<template>
  <div class="pedia">
    <van-tabs type="card" v-model="active" @change="change">
      <van-tab title="专家讲座">
        <div class="videos clearfix">
          <div class="lesson" v-for="(item,index) in videos" @click="tap(item.id)">
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
          <div class="knowlage-item" v-for="(item,index) in knowlage" @click="tap(item.id)">
            <div class="left">
              <span class="title">{{ item.title }}</span>
              <div class="foot">
                <span>{{ item.times }}</span>
              </div>
            </div>
            <img class="right" :src="item.images[0]"/>
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
    private videos: DynamicInterface[] = [];
    private knowlage: DynamicInterface[] = [];
    private active: boolean = 0;
    private id: number = 8; // 专家讲座 id
    // private id2: number = 9; // 农技知识 id
    private pageRows: number = 8; // 每页展示条数
    private page: number = 0; // 第几页
    private total: number = 0;
    private busy: boolean = true;
    @Watch('active')
    private onCctiveChange(val: number, oldVal: number) {
      this.getDynamic({columnId: this.id, pageRows: this.pageRows, page: 0}).then((res) => {
        // 是否需要确定参数类型
        if (val === 0) {
          this.videos = res.result as DynamicInterface[];
        } else if (val === 1) {
          this.knowlage = res.result as DynamicInterface[];
        }
        this.total = res.total;
      });
    }
    private mounted() {
      this.getDynamic({columnId: this.id, pageRows: this.pageRows, page: 0}).then((res) => {
        // 是否需要确定参数类型
        this.videos = res.result as DynamicInterface[];
        this.total = res.total;
      });
    }
//  private loadMore() {
//    this.busy = true;
//    if (this.total > 0 && this.page - this.total >= -1) {
//      return;
//    }
//    this.getDynamic({columnId: this.id, pageRows: this.pageRows, page: this.page++}).then((res) => {
//      // 是否需要确定参数类型
//      this.dynamics = this.dynamics.concat(res.result as DynamicInterface[]);
//      this.total = res.total;
//      this.busy = false;
//    });
//  }
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
    private change(i: number) {
      if(i === 0) {
        this.id = 8;
      } else if(i === 1) {
        this.id = 9;
      }
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
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1; 
        -webkit-box-orient: vertical;
        font-size:1.2rem;
        margin-top:.4rem;
      }
      img {
        width:100%;
        height:30vw;
      }
      .foot {
        color:#999999;
        padding: .4rem 0;
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
          height:20vw;
          object-fit: contain;
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