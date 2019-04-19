<template>
  <div class="card-foot">
    <div>{{ times }}</div>
    <div></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Dynamic from '@/interface/dynamic';
import VisitingCardInterface from '@/interface/visitingCard';
import scanImage from '@/components/scan-image.vue';
import visitingCard from '@/components/visiting-card.vue';

@Component
export default class CardFoot extends Vue {
  @Prop() private times!: number; // 动态信息
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.card-foot {
  display:flex;
  justify-content: space-between;
  padding:.4rem 1rem;
  font-size:.9rem;
  color:#999999;
  background:#fff;
}
</style>
