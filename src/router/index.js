import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import store from '@/store'

const router=  new VueRouter({
    routes: [
        {
            path:'/',
            redirect:'/login'
        },
        {
            path: '/login',
            component: ()=>import('@/components/Login'),
        },
        {
            path: '/home',
            component: ()=>import('@/components/Home'),
            
        },
        {
            path: '/map',
            component: ()=>import('@/components/Map'),
            meta:{
                title:'全景服务平台'
            }
            
        },
        {
            name:'backend',
            path: '/backend',
            component: ()=>import('@/components/Backend'),
            children:[
                {
                    path: '/backend',
                    redirect: 'individualManage' ,
                },
               
               {
                path:'individualManage',
                component:()=>import('@/pages/backend/IndividualManage'),
                meta:{
                    title:'个人信息'
                }
               },
               {
                path:'personnelManage',
                component:()=>import('@/pages/backend/PersonnelManage'),
                meta:{
                    title:'人员信息'
                }
               },
               {
                path:'placeManage',
                component:()=>import('@/pages/backend/PlaceManage'),
                meta:{
                    title:'地点管理'
                }
               },
               {
                path:'commentsManage',
                component:()=>import('@/pages/backend/CommentsManage'),
                meta:{
                    title:'评论管理'
                }
               },
            ]
        },
        
    ]
})
let isToken=true
router.beforeEach(async (to,from,next)=>{
    document.title='全景可视化管理' 
    if (to.meta.title) {
        document.title = to.meta.title
    }
    if(isToken&& localStorage.getItem('isLogin')){
        store.dispatch('getPermissionsInfo').then(()=>{
            const dynamicRouteses =store.state.permissionsInfo
            // dynamicRouteses.forEach(item=>{
            //     router.addRoute('backend',{  
            //         path:item.routingPath,
            //         component: (resolve) => require([`${item.componentPath}/index.vue`], resolve),
            //         meta:{
            //             title:item.menuName,
                     
            //         },
            //     })
            // })       
        })
    isToken=false
    }
  next()
})
export default router;


