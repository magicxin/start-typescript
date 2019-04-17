<template>
  <div class="dynamic-item" @click="$emit('tap')">
    <header class="header">
      <img :src="dynamic.avatar"/>
      <div class="right">
        <div class="top">
          <span class="author">{{ dynamic.author }}</span>
          <img :src="locationImage" />
          <span class="where">{{ dynamic.where }}</span>
        </div>
        <span class="datetime">{{ dynamic.datetime }}</span>
      </div>
    </header>
    <div v-if="dynamic.content" class="content">{{ dynamic.content }}</div>
    <div class="item-logo">
      <scan-image :bigImage="dynamic.images"></scan-image>
      <!--<img :src="dynamic.images[0]" @click.stop="$emit('scan')" />-->
    </div>
    <div class="foot">
      <div>{{ dynamic.times }}</div>
      <div></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Dynamic from '@/interface/dynamic';
import scanImage from '@/components/scan-image.vue';
import locationImage from '@/assets/location.png';

@Component({components: { scanImage }})
export default class DynamicItem extends Vue {
  private locationImage: string = locationImage;
  @Prop() private dynamic!: Dynamic; // 动态信息
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.dynamic-item {
  margin-top:1rem;
  background:#fff;
  padding:0 1rem;
  .header {
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
  .content {
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2; 
    -webkit-box-orient: vertical;
   
  }
  .item-logo {
    padding: .6rem 0;
    img {
      width:30vw;
      height:30vw;
    }
  }
  .foot {
    display:flex;
    justify-content: space-between;
    padding:.4rem 0;
    font-size:.9rem;
    color:#999999;
  }
}
.scroll {
    top: 350px;
  }
</style>
