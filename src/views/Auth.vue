<template>
  <div class="auth">
    <header class="header">
      <span class="tag">未认证村民</span>
    </header>
    <div class="form">
      <div class="field">
        <span>姓名</span>
        <div class="right">
          <div class="input"><input placeholder="请输入姓名"/></div>
        </div>
      </div>
      <div class="field">
        <span>身份号码</span>
        <div class="right">
          <div class="input"><input placeholder="请输入身份号码"/></div>
        </div>
      </div>
      <div class="field">
        <span>手机号</span>
        <div class="right">
          <div class="input"><input type="number" placeholder="请输入手机号"/></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import axios from '@/utils/rest';
  import avatar from '@/assets/1.png';
  import DynamicInterface from '@/interface/dynamic';
  import uris from '@/utils/uris';
  
  @Component
  export default class Chat extends Vue {
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
      .field {
        display:flex;
        align-items: center;
        margin-bottom:1rem;
      }
      span {
        display:flex;
        justify-content: flex-end;
        flex:1;
        margin-right:1rem;
      }
      .right {
        display:flex;
        align-items: center;
        flex:2;
      }
      .input {
        width:13rem;
        background:#f4f4f4;
        border:1px solid #dcdcdc;
        border-radius: 5px;
        padding: .4rem 1rem;
      }
      input {
        border:none;
        background:#f4f4f4;
      }
    }
  }
</style>