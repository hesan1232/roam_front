import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
// import { reqGetPermissionsInfo } from '@/axios/menu'
import { reqGetUserInfo } from "@/api/user";
import { reqGetRouterList} from "@/api/router"
Vue.use(Vuex)
const state={
    userInfo:{},
    permissionsInfo:[],
}
const actions={
    //获取用户权限
    getUserInfo({commit}){
     reqGetUserInfo().then((result)=>{
       commit('GETUserInfo',result.data)
     })
      
    },
     //获取用户权限 reqGetPermissionsInfo
     getPermissionsInfo({commit}) {
       reqGetRouterList().then((result)=>{
        commit('GETPermissionsInfo',result.data)
       })
      },
}
const mutations={
    GETUserInfo(state,data){
       state.userInfo=data
    },
    GETPermissionsInfo(state,data){
      state.permissionsInfo=data
    },
    RemovePermissionsInfo(state,data){
        state.permissionsInfo=[]  
    },
}

export default new Vuex.Store({
    state,
    actions,
    mutations,
    plugins:[
        createPersistedState({
            storage:localStorage,
            key:'store'
        }),
       
    ]
})