import axios from 'axios'
import qs from 'qs'

export const postUrl = (url, params,hint='') => {

  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(params), {}).then(function (res) {
      if (res.status === 200) {
        if (res.data.isOk) {
          resolve(res.data)
        } else {
          console.log('操作失败',hint);
          resolve(res.data);
        }

      }
    }).catch(function (e) {
      console.log('网络错误',e);
    });
  }).catch((e)=>{
    console.log('未知错误',e);
  });

};
