import requests from "./request";
import qs from 'qs';

//登录
export const reqUserLogin = (data) => {
    return requests({ url: '/user/login', method: 'post', data })
}
//注册
export const reqUserRegister = (data) => {
    return requests({ url: '/user/reguser', method: 'post', data })
}
//获取用户信息
export const reqGetUserInfo = () => {
    return requests({ url: '/userInfo/getUserInfo', method: 'get' })
}
//获取用户权限
export const reqGetMenuList = () => {
    return requests({ url: '/userInfo/getMenuList', method: 'get' })
}
//更新用户信息
export const reqUpdateUserInfo = (data) => {
    return requests({ url: '/userInfo/updateUserInfo', method: 'post',data })
}
