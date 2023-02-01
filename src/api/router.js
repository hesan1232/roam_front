import requests from "./request";


//获取用户权限路由
export const reqGetRouterList = (params) => {
    return requests({ 
        url: '/router/getRouter', 
        method: 'get', 
        params })
}

