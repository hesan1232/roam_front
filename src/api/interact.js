import requests from "./request";


//分页获取评论数据
export const reqGetInteractList = (params) => {
    return requests({ 
        url: '/interact/getInteractList', 
        method: 'get', 
        params })
}

//增加地点
export const reqAddInteract = (data) => {
    return requests({
        url: '/interact/addInteract',
        method: 'post',
        data
    })
}
//更新地点数据
export const reqUpdateInteractById = (data) => {
    return requests({
        url: '/interact/updateInteractById',
        method: 'post',
        data
    })
}
//根据id删除地点信息
export const reqDeleteInteractById = (id) => {
    return requests({
        url: '/interact/deleteInteractById',
        method: 'post',
        data: { id }
    })
}