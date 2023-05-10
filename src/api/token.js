//对外暴露一个函数
//存储token
export const setToken=(Authorization)=>{
    localStorage.setItem('AUTHORIZATION',Authorization)
    localStorage.setItem('isLogin',true)
}
//获取token
export const getToken=()=>{
    return localStorage.getItem('AUTHORIZATION')
    
}
//清除token
export const removeToken=()=>{
    localStorage.removeItem('AUTHORIZATION')
    localStorage.setItem('isLogin',false)
}
export const getIslogin=()=>{
    return localStorage.getItem('isLogin')=='true'
}