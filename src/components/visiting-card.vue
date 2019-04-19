<template>
  <div class="visiting-card">
    <img :src="visitingCard.avatar"/>
      <div class="right">
        <div class="top">
          <span class="author">{{ visitingCard.author }}</span>
          <img :src="locationImage" />
          <span class="where">{{ visitingCard.where }}</span>
        </div>
        <span class="datetime">{{ visitingCard.datetime }}</span>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import VisitingCardInterface from '@/interface/visitingCard';
import locationImage from '@/assets/location.png';

@Component
export default class VisitingCard extends Vue {
  private locationImage: string = locationImage;
  @Prop() private visitingCard!: VisitingCardInterface; // 卡片信息
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.visiting-card {
  display:flex;
    align-items:center;
    padding:.6rem 0;
    img {
      width:36px;
      height:36px;
      border-radius: 18px;
      margin-right:.8rem;
    }
    .top {
      display: flex;
      align-items: center;
      img {
        width:10px;
        height:14px;
      }
    }
    .author {
      margin-right:.6rem;
    }
    .where {
      color:#999999;
      font-size:.9rem;
    }
    .datetime {
      color:#999999;
      font-size:.9rem;
    }
    .right {
      display:flex;
      flex-direction: column;
    }
  }
</style>
