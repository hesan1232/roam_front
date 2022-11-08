import Vue from 'vue'
import Vuex from 'vuex'

// import { reqGetPermissionsInfo } from '@/axios/menu'
Vue.use(Vuex)
const state={
    userInfo:{
        name:'hesan',
        
    }
}
const actions={
    //  //获取用户权限 reqGetPermissionsInfo
    //  async getPermissionsInfo({commit}) {
    //     const result = await reqGetPermissionsInfo();
    //     if (result.code == 200) {
    //         commit('GETPermissionsInfo',result.data)
    //     }
    //   },
}
const mutations={
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
    mutations
})