<template>
  <div class="phone">
    <div class="back"></div>
    <div class="header">
      <van-search class="input" placeholder="搜索联系人" v-model="search" />
      <van-button class="btn" size="small" @click="searchByName">搜索</van-button>
    </div>
    <template v-if="phones.length>0">
      <div class="phone-item" v-for="(item, index) in phones" :key="index">
        <div class="left">
          <img :src="phoneIcon"/>
          <span>{{ item.who }}:</span>
        </div>
        <div class="right">
          <span>{{ item.phoneNumber }}</span>
          <span>({{ item.name }})</span>
        </div>
      </div>
    </template>
    <empty v-else></empty>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import axios from '@/utils/rest';
  import uris from '@/utils/uris';
  import PhoneInterface from '@/interface/phone';
  import { makeData } from '@/controller/phone';
  import Empty from '@/components/empty.vue';
  import avatar from '@/assets/1.png';
  import EventBus from '@/utils/eventBus';
  
  @Component({components: { Empty }})
  export default class Phone extends Vue {
    private phones: PhoneInterface[] = [];
    private search: string = '';
    private phoneIcon: string = avatar;
    private mounted() {
      this.getContact().then((res) => {
        // 暂时默认断言
        this.phones = res as PhoneInterface[];
      });
    }
    private searchByName() {
      const search = this.search.trim();
      if(!search) {
        this.getContact().then((res) => {
          // 暂时默认断言
          this.phones = res as PhoneInterface[];
        });
      }
      this.getContact({userName: search}).then((res) => {
        // 暂时默认断言
        this.phones = res as PhoneInterface[];
      });
    }
    private getContact(params?: any) {
      return new Promise((resolve, reject) => {
        axios.$get(uris.getContact, {params: params}).then((res: any) => {
          resolve(makeData(res));
        }).catch((err) => {
          reject(err);
        });
      });
    }
  }
</script>

<style lang="scss">
  .phone {
    margin-top:1rem;
    background:#fff;
    .back {
      height:1rem;
      background:#efeff4;
    }
    .header {
      display:flex;
      align-items: center;
      padding:.6rem 1rem;
      .van-search {
        padding:0;
        margin-right:1rem;
      }
      .input {
        flex:4;
      }
      .btn {
        flex:1;
        background:#00a4bd;
        color:#fff;
      }
    }
    .phone-item {
      display:flex;
      padding:.6rem 1rem;
      border-bottom:1px dashed #dddddd;
      img {
        width:20px;
        height:20px;
      }
      .left {
        display:flex;
        justify-content: space-between;
        flex:2;
        padding:0 1rem 0 0;
      }
      .right {
        display:flex;
        flex:3;
        span {
          margin-right:1rem;
        }
      }
    }
  }
</style>