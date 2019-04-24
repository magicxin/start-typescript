<template>
  <div class="image-container">
    <div class="img-content" v-if="hasSmall">
      <div class="item-content" v-for="(item,index) in smallImage">
        <img class="small" :src="item" @click.stop="goImageReader(index,smallImage)" />
      </div>
    </div>
    <div class="img-content" v-if="!hasSmall">
      <div class="item-content" v-for="(item,index) in bigImage">
        <img class="small" :src="item" @click.stop="goImageReader(index,bigImage)" />
      </div>
    </div>
    
    <!--start 查看大图 -->
    <div v-if="showBig" class="big-image">
      <div class="reader-content" @click.stop="closeBig">
        <img :src="urls[count]" @touchstart="tapStart" @touchmove="tapMove" @touchend="tapEnd"/>
      </div>
    </div>
    <!--end 查看大图 -->
  </div>
</template>
<script lang="ts">
  /*
   * @author suixin
   * @params smallImage{Array} bigImage{Array}
   * @requires false true
   * @example <magic-image :bigImage="itemData.images"></magic-image>
   * */
  import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
  @Component
  export default class ScanImage extends Vue {
    private hasSmall: boolean = false;
    private showBig: boolean = false;
    private count: number = 0;
    private startX: number = 0;
    private urls: string[] = [];
    private frontOrNext: string = '';
    @Prop() private smallImage?: string[];
    @Prop({required: false}) private bigImage!: string[];
    @Watch('smallImage')
    private onImageChange(newV: string[], oldV: string[]) {
      if (newV) {
        this.hasSmall = true;
      } else {
        this.hasSmall = false;
      }
    }
    private goImageReader(count: number, urls: string[]) {
      this.showBig = true;
      document.querySelector('body')!.style.overflow = 'hidden';
      this.count = count;
      this.urls = urls;
      console.log(this.urls)
    }
    private closeBig() {
      this.showBig = false;
      document.querySelector('body')!.style.overflow = 'visible';
      document.querySelector('html')!.style.overflow = 'visible';
    }
    private tapStart(e: any) {
      this.startX = e.targetTouches[0].screenX;
    }
    private tapMove(e: any) {
      if (e.targetTouches[0].screenX - this.startX < -50 ) {
        this.frontOrNext = 'next';
        } else if (e.targetTouches[0].screenX - this.startX > 50 ) {
          this.frontOrNext = 'front';
        } else {
          this.frontOrNext = '';
        }
    }
    private tapEnd(e: any) {
      if (this.frontOrNext === 'next' && +this.count >= this.urls.length - 1) {
        // this.$.toast('已经是最后一张');
        }
      if (this.frontOrNext === 'next' && +this.count < this.urls.length - 1) {
        this.count = +this.count + 1;
      }
      if (this.frontOrNext === 'front' && +this.count <= 0) {
        //  this.$.toast('已经是第一张');
      }
      if (this.frontOrNext === 'front' && +this.count > 0) {
        this.count = +this.count - 1;
      }
    }
  }
</script>

<style scoped>
  .img-content {
    display: flex;
    flex-wrap: wrap;
  }
  
  .item-content {
    width: 28vw;
    height: 28vw;
    display: flex;
    align-items: center;
    background: #fff;
    overflow-y: hidden;
    margin: 4px 4px 0 0;
  }
  
  .small {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .big-image {
    position:fixed;
    transform: translateZ(0);
    top:0;
    left:0;
    width:100vw;
    height:100vh;
    background:#000;
    z-index:99999;
  }
  .reader-content{
    width:100vw;
    height:100vh;
    display:flex;
    align-items: center;
  }
  .reader-content img{
    width: 100% !important;
    height:90% !important;
    object-fit: contain;
  }
</style>