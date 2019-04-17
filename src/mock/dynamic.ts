import Vue from 'vue';
const dMock = Vue.prototype.$mock;

Vue.prototype.$mock.mock(/search/, 'get', {
  'code':  200,
  'data|5': [{
    'avatar': dMock.Random.dataImage(),
    'datetime': dMock.Random.date('yyyy-MM-dd'),
    'author': dMock.Random.cname(),
    'where': dMock.Random.city(),
    'times|0-80': 1,
    'content': dMock.Random.cparagraph(10, 100),
    'images': [dMock.Random.dataImage()],
  }],
  'message': 'success',
});
