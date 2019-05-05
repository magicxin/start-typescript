<template>
  <div class="detail" v-if="dynamic">
    <visiting-card :visitingCard="dynamic"></visiting-card>
    <div class="container">
      <p class="content">{{ dynamic.content }}</p>
      <video v-if="dynamic.videos[0]" class="video" :src="dynamic.videos[0]" controls="controls"/>
      <img v-else-if="dynamic.images[0]" class="image" :src="dynamic.images[0]"/>
    </div>
    <card-foot :times="dynamic.times"></card-foot>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import axios from '@/utils/rest';
  import uris from '@/utils/uris';
  import visitingCard from '@/components/visiting-card.vue';
  import cardFoot from '@/components/card-foot.vue';
  import DynamicInterface from '@/interface/dynamic';
  import { makeData } from '@/controller/dynamicDetail';
  import addTime from '@/controller/addTime';
  
  @Component({components: { visitingCard, cardFoot }})
  export default class Detail extends Vue {
    private dynamic: DynamicInterface = null;
    private mounted() {
      const id = this.$route.params._id;
      addTime(id);
      this.getDynamicDetail({infoId : id}).then(res => {
        this.dynamic = res;
      });
    }
    // 暂时不明确传参
    private getDynamicDetail(params?: any) {
      return new Promise((resolve, reject) => {
        axios.$get(uris.getDynamicDetail, {params: params}).then((res) => {
          resolve(makeData.bind(this)(res));
        }).catch((err) => {
          reject(err);
        });
      });
    }
  }
</script>

<style lang="scss">
  .detail {
    margin-top:1rem;
    background:#fff;
    padding:0 1rem;
    .content {
      margin-bottom:1rem;
    }
    .image {
      width:100%;
    }
    .video {
      width:100%;
    }
  }
</style>