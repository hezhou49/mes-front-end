import axios from 'axios'
import {Message} from 'element-ui'

axios.interceptors.response.use(success=>{
    // console.log(success);
    if(success.data.status===500){
        Message.error({message:success.data.msg});
        return;
    }
    if(success.data.msg!=='ok'){
        Message.success({message:success.data.msg});
    }
    return success.data;
},error => {
    Message.error({message:"报错"});

});

export const postKeyValueRequst=(url,params)=>{
    return axios({
        method:'post',
        url:'/api'+url,
        data:params,
        transformRequest:[function (data) {
            let ret='';
            for(let i in data){
                ret+=encodeURIComponent(i)+'='+encodeURIComponent(data[i])+'&';
            }
            console.log(ret);
            return ret;
        }],
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        }
    })
};
export const getRequst=(url,params)=>{
    return axios({
        method:'get',
        url:'/api'+url,
        data:params,

    })
};