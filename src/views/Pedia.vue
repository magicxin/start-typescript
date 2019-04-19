<template>
  <div class="pedia">
    <van-tabs type="card">
      <van-tab title="专家讲座">专家讲座</van-tab>
      <van-tab title="农技知识">内容 2</van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import dcll from '@/assets/dcll.png';
  
  @Component
  export default class Pedia extends Vue {
    private mounted() {
      const a = 1;
    }
  }
</script>

<style lang="scss">
  .pedia {
    margin-top:1rem;
    background:#fff;
    padding:1rem;
  }
</style>