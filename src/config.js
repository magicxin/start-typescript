let config = null;
const devHost = 'http://192.168.200.109:8080';
  const dev = {
    staticPath: devHost + '/cunpluts',
    proxy: devHost + '/cunpluts/',
    publicPath: '/',
  };
  const pro = {
    proxy: 'http://192.168.200.109:8080/cunpluts/',
    publicPath: '/cunpluts/',
  };
  if (process.env.NODE_ENV === 'development') {
    config = dev;
  } else if (process.env.NODE_ENV === 'production') {
    config = pro;
  }
  
module.exports = config;