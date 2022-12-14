//二次封装axios
import axios from 'axios'
import { getToken } from "./token";

const requests = axios.create({
    baseURL: '/api',
    timeout: 5000
})
//请求拦截器
requests.interceptors.request.use((config)=>{
    if(getToken()){
        config.headers.Authorization=getToken()
    }
    return config
})
//响应拦截器
requests.interceptors.response.use((res)=>{
    return res.data
},()=>{
    //响应失败的回调
    return Promise.reject(new Error('fail'))
})

//对外暴露
export default requests