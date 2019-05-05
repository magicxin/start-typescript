let config = null;
// const devHost = 'http://192.168.200.109:8080';
const devHost = 'http://192.168.200.85:8005';
const proHost = 'http://www.jiachengnet.com';
  const dev = {
    staticPath: devHost + '/cunpluts',
    proxy: devHost + '/cunpluts/',
    publicPath: '/',
    routePath: '',
  };
  const pro = {
    staticPath: proHost + '/cunpluts',
    proxy: 'http://http://www.jiachengnet.com/cunpluts/',
    publicPath: '/cunpluts/cun_app/',
    routePath: proHost + '/cunpluts',
  };
  if (process.env.NODE_ENV === 'development') {
    config = dev;
  } else if (process.env.NODE_ENV === 'production') {
    config = pro;
  }
  
module.exports = config;