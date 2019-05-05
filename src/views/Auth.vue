<template>
  <div class="auth">
    <header class="header">
      <span class="tag">未认证村民</span>
    </header>
    <div class="form">
      <form-item label="姓名" name="name" v-model="name" v-validate="'required'" :errorMessage="errors.first('name') | msgFilter"></form-item>
      <form-item label="身份证" name="card" v-model="card" v-validate="'required'" :errorMessage="errors.first('card') | msgFilter"></form-item>
      <form-item label="手机号" name="phone" v-model="phone" :errorMessage="errors.first('phone')"></form-item>
      <van-button class="submit-btn" size="large" @click="check">立即认证</van-button>
    </div>
  </div>
</template> 

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import axios from '@/utils/rest';
  import avatar from '@/assets/1.png';
  import DynamicInterface from '@/interface/dynamic';
  import uris from '@/utils/uris';
  import FormItem from '@/components/form-item.vue';
  
  @Component({components: { FormItem },
    filters: {
      msgFilter(msg) {
      if (!msg) return;
        if(msg.indexOf('name') > -1) {
          return '姓名是必须的';
        }
        if(msg.indexOf('card') > -1) {
          return '身份证是必须的';
        }
      }
    }
  })
  export default class Chat extends Vue {
    private name: string = null;
    private card: string = null;
    private phone: number = null;
    private check() {
      this.$validator.validateAll().then((result) => {
        if(result) {
          this.register({
            cardNo: this.card,
            displayName: this.name,
            mobile: this.mobile,
          }).then((res) => {
            localStorage.setItem('village_token',res.authStatus);
            this.$router.push({
              name: this.$route.params.name,
            });
          }).catch((err) => {
            this.$toast(err.message);
          });
        }
      })
    }
    // 暂时不明确传参
    private register(params?: any) {
      return new Promise((resolve, reject) => {
        axios.$post(uris.auth, params).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    }
  }
</script>

<style lang="scss">
  .auth {
    .header {
      position:relative;
      display:flex;
      height:180px;
      background:#007f93;
      border-radius: 50% / 0 0 50px 50px;
      .tag {
        position:absolute;
        left:50%;
        transform: translate(-50%, 50%);
        bottom:0;
        padding:.3rem 1rem;
        color:#666666;
        background:#ffeded;
        border: 1px solid #f3a3a3;
        border-radius: 5px;
      }
    }
    .form {
      display:flex;
      flex-direction: column;
      margin-top:4rem;
      .form-item {
        padding:0 3rem;
      }
      .van-cell__title  {
        display:flex;
        justify-content: flex-end;
        padding:.3rem 1rem 0 0;
      }
      .van-field__body {
        padding:.4rem;
        background:#f4f4f4;
        border:1px solid #dcdcdc;
        border-radius: 5px;
      }
    }
    .submit-btn {
      width: 70vw;
      border-radius: 1rem;
      margin:0 auto;
      margin-top:2rem;
      background:#007f93;
      color:#fff;
    }
  }
</style>