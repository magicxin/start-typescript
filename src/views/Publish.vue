<template>
  <div class="publish">
    <header class="header">
      <span class="cancel" @click="$router.back()">取消</span>
      <van-button class="sub-btn" @click="publish">发布</van-button>
    </header>
    <van-field type="textarea" :autosize="autosize" v-model="value" placeholder="请输入内容" />
    <!--start image container -->
    <div class="img-container clearfix">
      <div class="img-item" v-for="(item, index) in images" :key="index">
        <img :src="item.blob"/>
      </div>
      <!--start upload -->
      <label for="upload">
        <div class="img-item">
          <img :src="addImage" />
        </div>
      </label>
      <input class="upload" id="upload" type="file" accept="image/*,video/*" @change="getFile"/>
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
  export default class Publish extends Vue {
    private addImage: string = addImage;
    private value: string = ''; // textarea 内容
    private autosize: any = {minHeight: 100, maxHeight: 250}; // textarea 高度设置
    private images: any[] = [];
    private columnId: number = 16; // 家长里短栏目id
    private getFile(e: IHTMLInputEvent) {
      const files: any = e.target.files;
      let blob = null;
      let that = this;
      const reader = new FileReader();
       reader.readAsDataURL(files[0]);//发起异步请求
       reader.onload = function() {
          //读取完成后，数据保存在对象的result属性中
          blob = this.result;
          that.images.push({file: files[0], blob: blob});
        }
    }
    private publish() {
      const formData = new FormData();
      formData.append('columnId', this.columnId.toString());
      formData.append('infoContent', this.value);
      formData.append('contentType', '1');
      formData.append('files', this.images[0].file);
      this.sendData(formData).then((res) => {
        console.log(res);
      });
    }
    // 暂时不明确传参
    private sendData(params?: any) {
      return new Promise((resolve, reject) => {
        axios.$post(uris.publish, params).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    }
  }
</script>

<style lang="scss">
  .publish {
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
    .add-btn {
      width:30vw;
      height:30vw;
      background:#DCDCDC;
      color:#fff;
      font-size:4rem;
      font-weight: 100;
      display:flex;
      justify-content: center;
      align-items: center;
    }
    .upload {
      display:none;
    }
    .img-container {
      margin-top: 1rem;
    }
    .img-item {
      float:left;
      img {
        with:28vw;
        height:28vw;
        object-fit: contain;
        margin-left:.4rem;
      }
    }
  }
</style>