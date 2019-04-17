<template>
  <div class="detail">
    detail
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  
  @Component
  export default class Detail extends Vue {
    private search: string = '';
    private mounted() {
      const a = 1;
    }
  }
</script>

<style lang="scss">
  .detail {
    margin-top:1rem;
    background:#fff;
    padding:0 1rem;
  }
</style>