<template>
  <div class="comment-detail" v-if="dynamic">
    <visiting-card :visitingCard="dynamic"></visiting-card>
    <div class="container">
      <p class="content">{{ dynamic.content }}</p>
      <img v-if="dynamic.images[0]" class="image" :src="dynamic.images[0]"/>
      <div class="comment">
        <span v-if="dynamic.discussList.length === 0">暂无评论</span>
        <span v-else>共 {{dynamic.discussList.length}} 条评论</span>
        <img :src="publish" @click="tap(dynamic)"/>
      </div>
      <div v-for="(obj,index) in dynamic.discussList" :key="index" class="visiting-card" @click="tap(obj, '1')">
        <img :src="obj.avatar"/>
        <div class="right">
          <div class="top">
            <span class="author">{{ obj.author }}</span>
            <span class="where">{{ obj.time }}</span>
          </div>
          <div>
            <template v-if="obj.replyToUserName">
              <span>回复</span><span class="blue">@{{obj.replyToUserName}}</span>
            </template>  
            <span class="datetime">{{ obj.content }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import axios from '@/utils/rest';
  import uris from '@/utils/uris';
  import visitingCard from '@/components/visiting-card.vue';
  import DynamicInterface from '@/interface/dynamic';
  import { makeData } from '@/controller/dynamicDetail';
  import publish from '@/assets/publish.png';
  
  @Component({components: { visitingCard }})
  export default class CommentDetail extends Vue {
    private publish: string = publish;
    private dynamic: DynamicInterface = null;
    private mounted() {
      const id = this.$route.params._id;
      this.getDynamicDetail({infoId : id}).then(res => {
        this.dynamic = res;
        console.log(res)
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
    private tap(item: DynamicInterface,reply: string = '0') {
      console.log(item)
      this.$router.push({
        name: 'send',
        params: {
          _id: item.id.toString(),
          _disId: item.disParentId ? item.disParentId.toString() : '',
          _reply: reply,
        },
      });
    }
  }
</script>

<style lang="scss">
  .comment-detail {
    margin-top:1rem;
    background:#fff;
    padding:0 1rem;
    .comment {
      display:flex;
      justify-content: space-between;
      align-items: center;
      background:#fff;
      color:#666666;
      padding:.4rem 1rem;
      border-top: 1px solid #e5e5e5;
      border-bottom: 1px solid #e5e5e5;
      img {
        width:1.4rem;
        height:1.4rem;
      }
    }
    .comment-list {
      background:#fff;
    }
  }
</style>