import axios from 'axios'

export const get = (url,params,callback,fail)=>{
  if(typeof callback === 'function' && typeof params === 'object') {
    axios({
      type:'get',
      url: url,
      params: params
    }).then(res=>{
      if(res.status === 200) {
        
      }
    })
  }
}
