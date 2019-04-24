<template>
  <div class="scroll" id="$$$scroll"
       :class="{
         'pull-down': (state === 0),
         'pull-up': (state === 1),
         refreshing: (state === 2),
         touching: touching
       }"
      @touchstart="onRefresh ? touchStart($event) : undefined"
      @touchmove="onRefresh ? touchMove($event) : undefined"
      @touchend="onRefresh ? touchEnd($event) : undefined"
      @mousedown="onRefresh ? mouseDown($event) : undefined"
      @mousemove="onRefresh ? mouseMove($event) : undefined"
      @mouseup="onRefresh ? mouseUp($event) : undefined"
      @scroll="(onInfinite || infiniteLoading) ? onScroll($event) : undefined"
       >
    <!-- <div class="scroll-inner"
      :style="{
        transform: 'translate3d(0, ' + top + 'px, 0)',
        webkitTransform: 'translate3d(0, ' + top + 'px, 0)'
      }"
    > -->
    <div class="scroll-inner">
      <div class="pull-to-refresh-layer" v-if="!!onRefresh">
        <slot name="refresh">
          <div class="preloader"></div>
          <div class="pull-to-refresh-arrow"></div>
          <span class="label-down">下拉刷新</span>
          <span class="label-up">释放刷新</span>
          <span class="label-refresh">正在刷新..</span>
        </slot>
      </div>
      <slot></slot>
      <div class="infinite-layer" v-if="onInfinite">
        <slot name="infinite">
          <div class="infinite-preloader"></div>
          <span class="label-loading">正在加载..</span>
        </slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  @Component
  export default class LoadMore extends Vue {
    private top: number = 0;
    private state: number = 0; // 0:down, 1: up, 2: refreshing
    private startY: number = 0;
    private touching: boolean = false;
    private infiniteLoading: boolean = false;
    @Prop({default: 0, required: false}) private offset!: number;
    @Prop({type: Function, required: false}) private onRefresh: any;
    @Prop({type: Function, required: false}) private onInfinite: any;
    private touchStart(e: TouchEvent) {
      this.startY = e.targetTouches[0].pageY;
      this.touching = true;
    }
    private mouseDown(e: MouseEvent) {
      this.startY = e.pageY;
      this.touching = true;
    }
    private touchMove(e: TouchEvent) {
      if (this.$el.scrollTop > 0 || !this.touching) {
        return;
      }
      const diff = e.targetTouches[0].pageY - this.startY;
      if (diff > 0) {
        e.preventDefault();
      }
      this.top = Math.pow(diff, 0.8) + (this.state === 2 ? this.offset : 0);
      if (this.state === 2) { // in refreshing
        return;
      }
      if (this.top >= this.offset) {
        this.state = 1;
      } else {
        this.state = 0;
      }
    }
    private mouseMove(e: MouseEvent) {
      if (this.$el.scrollTop > 0 || !this.touching) {
        return;
      }
      const diff = e.pageY - this.startY;
      if (diff > 0) {
        e.preventDefault();
      }
      this.top = Math.pow(diff, 0.8) + (this.state === 2 ? this.offset : 0);
      if (this.state === 2) { // in refreshing
        return;
      }
      if (this.top >= this.offset) {
        this.state = 1;
      } else {
        this.state = 0;
      }
    }
    private touchEnd(e: TouchEvent) {
      this.touching = false;
      if (this.state === 2) { // in refreshing
        this.state = 2;
        this.top = this.offset;
        return;
      }
      if (this.top >= this.offset) { // do refresh
        this.refresh();
      } else {  // cancel refresh
        this.state = 0;
        this.top = 0;
      }
    }
    private mouseUp(e: MouseEvent) {
      this.touching = false;
      if (this.state === 2) { // in refreshing
        this.state = 2;
        this.top = this.offset;
        return;
      }
      if (this.top >= this.offset) { // do refresh
        this.refresh();
      } else { // cancel refresh
        this.state = 0;
        this.top = 0;
      }
    }
    private refresh() {
      this.state = 2;
      this.top = this.offset;
      this.onRefresh(this.refreshDone);
    }
    private refreshDone() {
      this.state = 0;
      this.top = 0;
    }
    private infinite() {
      this.infiniteLoading = true;
      this.onInfinite(this.infiniteDone);
    }
    private infiniteDone() {
      this.infiniteLoading = false;
    }
    private onScroll(e: any) {
      if (this.infiniteLoading) {
        return;
      }
      const outerHeight = this.$el.clientHeight;
      const innerHeight = this.$el.querySelector('.scroll-inner')!.clientHeight;
      const scrollTop = this.$el.scrollTop;
      const ptrHeight = this.onRefresh ? this.$el.querySelector('.pull-to-refresh-layer')!.clientHeight : 0;
      const infiniteHeight = this.$el.querySelector('.infinite-layer')!.clientHeight;
      const bottom = innerHeight - outerHeight - scrollTop - ptrHeight;
      if (bottom < infiniteHeight) {
        this.infinite();
      }
    }
  }
</script>

<style lang="scss" scoped>
$layer-height: 44px;
$color-text-gray: #aaa;

@keyframes preloader-spin {
  100% {
    transform: rotate(360deg);
  }
}

@mixin preloader() {
  width: 20px;
  height: 20px;
  animation: preloader-spin 1s steps(12, end) infinite;
  &:after {
    display: block;
    width: 100%;
    height: 100%;
    content: "";
    background-image: url("data:image/svg+xml;charset=utf-8,<svg viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><defs><line id='l' x1='60' x2='60' y1='7' y2='27' stroke='#6c6c6c' stroke-width='11' stroke-linecap='round'/></defs><g><use xlink:href='#l' opacity='.27'/><use xlink:href='#l' opacity='.27' transform='rotate(30 60,60)'/><use xlink:href='#l' opacity='.27' transform='rotate(60 60,60)'/><use xlink:href='#l' opacity='.27' transform='rotate(90 60,60)'/><use xlink:href='#l' opacity='.27' transform='rotate(120 60,60)'/><use xlink:href='#l' opacity='.27' transform='rotate(150 60,60)'/><use xlink:href='#l' opacity='.37' transform='rotate(180 60,60)'/><use xlink:href='#l' opacity='.46' transform='rotate(210 60,60)'/><use xlink:href='#l' opacity='.56' transform='rotate(240 60,60)'/><use xlink:href='#l' opacity='.66' transform='rotate(270 60,60)'/><use xlink:href='#l' opacity='.75' transform='rotate(300 60,60)'/><use xlink:href='#l' opacity='.85' transform='rotate(330 60,60)'/></g></svg>");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
  }
}

.pull-to-refresh-layer {
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  height: $layer-height;
  color: $color-text-gray;

  .preloader {
    visibility: hidden;
    @include preloader();
  }
  .pull-to-refresh-arrow {
    width: 20px;
    height: 20px;
    background: no-repeat center;
    background-image: url("data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 26 40'><polygon points='9,22 9,0 17,0 17,22 26,22 13.5,40 0,22' fill='#8c8c8c'/></svg>");
    background-size: 10.4px 16px;
    z-index: 10;
    transform: rotate(0deg) translate3d(0, 0, 0);
    transition-duration: 300ms;
    margin-left: -20px;
  }

}

.scroll {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  &.touching .scroll-inner {
    transition-duration: 0ms;
  }
  &:not(.refreshing) {
    .pull-to-refresh-layer .preloader {
      animation: none;
    }
  }
  &.refreshing {
    .pull-to-refresh-arrow {
      visibility: hidden;
      transition-duration: 0ms;
    }
    .preloader {
      visibility: visible;
    }
  }
  &.pull-up {
    .pull-to-refresh-arrow {
      transform: rotate(180deg) translate3d(0, 0, 0);
    }
  }
}

.scroll-inner {
  position: absolute;
  /* top: -$layer-height; */
  top: 0;
  width: 100%;
  transition-duration: 300ms;
}

.label-down, .label-up, .label-refresh {
  display: none;
  text-align: center;
}

.pull-down .label-down,
.pull-up .label-up,
.refreshing .label-refresh {
  display: block;
  width: 5.5em;
}

.pull-to-refresh-layer {
  display: flex;
  align-items: center;
  justify-content: center;
}

.infinite-layer {
  height: $layer-height;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $color-text-gray;
}

.infinite-preloader {
  @include preloader();
}

.label-loading {
  display: block;
  width: 5.5em;
  text-align: center;
}
</style>