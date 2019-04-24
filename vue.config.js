const config = require('./src/config');
// vue.config.js
module.exports = {
  // 选项...
  // 例如，如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/。
  publicPath: config.publicPath,
  devServer: {
    proxy: config.proxy
  }
}