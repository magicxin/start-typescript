<template>
  <div class="empty">
    <img :src="icon" />
    <span class="text">{{ message }}</span>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import empty from '@/assets/empty.png';
  
  @Component
  export default class Empty extends Vue {
    @Prop({default: empty}) private icon: string;
    @Prop({default: '暂无数据信息，到别的地方看看吧~'}) private message: string;
  }
</script>
<style lang="scss">
  .empty {
    height:100%;
    display:flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    .text {
      margin-top:1rem;
      color:#cccccc;
    }
  }
</style>
