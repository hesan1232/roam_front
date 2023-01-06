import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
// import { reqGetPermissionsInfo } from '@/axios/menu'
import { reqGetUserInfo } from "@/api/user";
Vue.use(Vuex)
const state={
    userInfo:{}
}
const actions={
    //获取用户权限
    getUserInfo({commit}){
     reqGetUserInfo().then((result)=>{
        console.log('获取数据')
       commit('GETUserInfo',result.data)
     })
      
    }
    //  //获取用户权限 reqGetPermissionsInfo
    //  async getPermissionsInfo({commit}) {
    //     const result = await reqGetPermissionsInfo();
    //     if (result.code == 200) {
    //         commit('GETPermissionsInfo',result.data)
    //     }
    //   },
}
const mutations={
    GETUserInfo(state,data){
       state.userInfo=data
    }
    // GETPermissionsInfo(state,data){
    //   state.permissionsInfo=data
    // },
    // RemovePermissionsInfo(state,data){
    //     state.permissionsInfo=[]  
    // },
}

export default new Vuex.Store({
    state,
    actions,
    mutations,
    plugins:[
        createPersistedState({
            storage:localStorage,
            key:'userInfo'
        })
    ]
})