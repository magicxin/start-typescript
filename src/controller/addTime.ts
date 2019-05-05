import axios from '@/utils/rest';
import uris from '@/utils/uris';

export default function(id: number) {
  axios.$get(uris.addTime, {params: {infoId: id}}).catch((err) => {
    reject(err);
  });
}
