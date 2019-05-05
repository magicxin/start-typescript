<template>
  <div class="form-item">
    <!-- input -->
    <van-field v-if="type!=='select'" :type="type" v-model="inputValue" :placeholder="placeholder" :label="label" :required="required" :readonly="readonly"
       @input="input" :error-message="errorMessage"/>
    <!-- input -->
    <!-- select -->
    <van-field v-if="type==='select'" v-model="inputValue" :placeholder="placeholder" :label="label" :required="required" readonly 
      @click="showPicker(readonly)" right-icon="arrow" :error-message="errorMessage"/>
    <van-popup v-if="type==='select'" v-model="show" class="pop-container" position="bottom">
      <van-picker :columns="columns" show-toolbar @cancel="cancel" @confirm="confirm"/>
    </van-popup>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
  @Component
  export default class FormItem extends Vue {
    private show: boolean = false;
    private inputValue: string = '';
    @Prop() value: string;
    // validate: val => ['input','textarea','select','number','text','tel'].indexOf(val) > -1
    @Prop() type: string;
    @Prop({default: '请输入'}) placeholder: string;
    @Prop() label: string;
    @Prop() required: boolean;
    @Prop() readonly: boolean;
    @Prop() columns: any[];
    @Prop() errorMessage: string;
    @Watch('value')
    private onValueChange(v: string) {
      this.inputValue = v;
    }
    private showPicker(readonly) {
      if(readonly) {
        return;
      };
      this.show = true;
    }
    private confirm(v) {
      this.inputValue = v.text;
      this.show = false;
      this.$emit('confirm',v);
    }
    private cancel() {
      this.show = false;
    }
    private input() {
      this.$emit('input',this.inputValue);
    }
  }

</script>
<style lang="scss">
  .form-item {
    .pop-container {
      width:100%;
    }
  }
</style>
