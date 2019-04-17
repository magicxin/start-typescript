<template>
  <div class="phone">
    <van-search placeholder="搜索联系人" v-model="search" />
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  
  @Component
  export default class Phone extends Vue {
    private search: string = '';
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
  }
</style>