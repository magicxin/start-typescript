<template>
  <div class="phone">
    <van-search placeholder="搜索联系人" v-model="search" />
    <div class="phone-item">
      <div class="left">
        <img :src="phoneIcon"/>
        <span>大队长电话:</span>
      </div>
      <div class="right">
        <span>18899995555</span>
        <span>(张晓霞)</span>
      </div>
    </div>
    <div class="phone-item">
      <div class="left">
        <img :src="phoneIcon"/>
        <span>大队长asd电话:</span>
      </div>
      <div class="right">
        <span>18899995555</span>
        <span>(张晓霞)</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import avatar from '@/assets/1.png';
  
  @Component
  export default class Phone extends Vue {
    private search: string = '';
    private phoneIcon: string = avatar;
    private mounted() {
      const a = 1;
    }
  }
</script>

<style lang="scss">
  .phone {
    margin-top:1rem;
    background:#fff;
    padding:0 1rem;
    .phone-item {
      display:flex;
      padding:.6rem 0;
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
        justify-content: space-between;
        flex:3;
      }
    }
  }
</style>