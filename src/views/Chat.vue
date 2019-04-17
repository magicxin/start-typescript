<template>
  <div class="chat">
    chat
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import dcll from '@/assets/dcll.png';
  
  @Component
  export default class Chat extends Vue {
    private mounted() {
      const a = 1;
    }
  }
</script>

<style lang="scss">
  .chat {
    
  }
</style>