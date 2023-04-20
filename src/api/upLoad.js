import requests from "./request";

//上传图片
export const reqUpLoadImage= (data) => {

    return requests({ url: '/upLoad/image', method: 'post', data })
}