<template>
  <div class="send">
    <header class="header">
      <span class="cancel" @click="$router.back()">取消</span>
      <van-button class="sub-btn" size="small" @click="publish">回复</van-button>
    </header>
    <van-field class="textarea" type="textarea" :autosize="autosize" v-model="value" placeholder="请输入内容" />
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import IHTMLInputEvent from '@/interface/IHtmlInputEvent';
  import addImage from '@/assets/add.png';
  import axios from '@/utils/rest';
  import uris from '@/utils/uris';
  
  @Component
  export default class Send extends Vue {
    private addImage: string = addImage;
    private value: string = ''; // textarea 内容
    private autosize: any = {minHeight: 100, maxHeight: 250}; // textarea 高度设置
    private images: any[] = [];
    private columnId: number = 16; // 家长里短栏目id
    private publish() {
      console.log(this.$route.params._reply)
      console.log(this.$route.params._disId)
      if (this.value.trim()) {
        // const formData = new FormData();
        // formData.append('infoId', this.$route.params._id.toString());
        // formData.append('discussContent', this.value);
        // formData.append('isReply', '0');
        // this.sendData(formData).then(res=>{
        //   console.log(res);
        // })
        this.sendData({
          infoId: Number(this.$route.params._id),
          disParentId: Number(this.$route.params._disId),
          discussContent: this.value,
          isReply: this.$route.params._reply,
        }).then(res=>{
          this.$router.back();
        this.$toast('回复成功');
        })
      } else {
        this.$toast('请输入内容');
      }
      
    }
    // 暂时不明确传参
    private sendData(params?: any) {
      return new Promise((resolve, reject) => {
        axios.$get(uris.send, {params: params}).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    }
  }
</script>

<style lang="scss">
  .send {
    padding:1rem;
    .header {
      display:flex;
      align-items: center;
      justify-content: space-between;
    }
    .cancel {
      padding:1rem 1.4rem;
    }
    .sub-btn {
      color:#fff;
      background:#00a4bd;
      padding:0 1.4rem;
      border-radius: .4rem;
    }
    .textarea {
      border: 1px solid #e5e5e5;
      margin-top:1rem;
    }
  }
</style>