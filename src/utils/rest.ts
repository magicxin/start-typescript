import errorMessage from '@/utils/error-message';
import Vue from 'vue';
import Rest from '@/interface/rest';
import axios from 'axios';

class Axios {
  public $get(url: string, data: object) {
    return new Promise((resolve, reject) => {
      axios.get< Rest >(url, data).then((res) => {
        if (res.data.code === 200) {
          resolve(res.data.data);
        } else {
          reject({
            code: res.data.code,
            message: errorMessage(res.data.code) || res.data.message,
          });
        }
      });
    });
  }
  public $post(url: string, data: object) {
    return new Promise((resolve, reject) => {
      axios.post< Rest >(url, data).then((res) => {
        if (res.data.code === 200) {
          resolve(res.data.data);
        } else {
          reject({
            code: res.data.code,
            message: errorMessage(res.data.code) || res.data.message,
          });
        }
      });
    });
  }
}
export default new Axios();
