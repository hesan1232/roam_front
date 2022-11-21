import requests from "./request";

//获取地点列表
export const reqGetAllPlace = () => {
    return requests({ 
        url: '/place/getAllPlace', 
        method: 'get' })
}
//获取地点列表
export const reqGetPlaceList = (params) => {
    return requests({ 
        url: '/place/getPlaceList', 
        method: 'get', 
        params })
}
//根据名字模糊查询地点信息
export const reqGetPlaceByPlaceName = (placeName) => {
    return requests({
        url: '/place/getPlaceByPlaceName',
        method: 'get',
        params: { placeName }
    })
}
//获取地点分类列表 /place/getPlaceTypeList
export const reqGetPlaceTypeList = () => {
    return requests({
        url: '/place/getPlaceTypeList',
        method: 'get',
    })
}

//根据类型查找地点列表 /place/getPlaceListByPlaceType
export const reqGetPlaceListByPlaceType = (params) => {
    return requests({
        url: '/place/getPlaceListByPlaceType',
        method: 'get',
        params
    })
}
//增加地点
export const reqAddPlace = (data) => {
    return requests({
        url: '/place/addPlace',
        method: 'post',
        data
    })
}
//更新地点数据
export const reqUpdatePlaceById = (data) => {
    return requests({
        url: '/place/updatePlaceListById',
        method: 'post',
        data
    })
}
//根据id删除地点信息
export const reqDeletePlaceById = (id) => {
    return requests({
        url: '/place/deletePlaceById',
        method: 'post',
        data: { id }
    })
}