import Vue from 'vue';
import config from '@/config';

Vue.mixin({
  methods: {
    // 添加静态路径
    addPath(url) {
      return config.staticPath + url;
    },
  },
});
