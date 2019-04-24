import Vue from 'vue';
const dMock = Vue.prototype.$mock;

Vue.prototype.$mock.mock(/phone/, 'get', {
  'code':  200,
  'data|5': [{
    'who': dMock.Random.ctitle(4, 6),
    'phoneNumber|10000000000-19999999999': 10000000000,
    'name': dMock.Random.cname(),
  }],
  'message': 'success',
});
