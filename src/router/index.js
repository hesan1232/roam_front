import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
//引入组件
import Login from '@/components/Login'
import Home from '@/components/Home'
  import HomePage from '@/pages/home/homePage'

import Map from "@/components/Map"
import Backend from "@/components/Backend"
  import CommentsManage from "@/pages/backend/CommentsManage"
  import IndividualManage from "@/pages/backend/IndividualManage"
  import PersonnelManage from "@/pages/backend/PersonnelManage"
  import PlaceManage from "@/pages/backend/PlaceManage"
  

const router=  new VueRouter({
    routes: [
        {
            path:'/',
            redirect:'/login'
        },
        {
            path: '/login',
            component: Login,
        },
        {
            path: '/home',
            component: Home,
            children:[
                {
                    path: '/home',
                    redirect: 'homepage' 
                },
                {
                    path: 'homepage',
                    component: HomePage,  
                }
               
            ]
        },
        {
            path: '/map',
            component: Map,
            
        },
        {
            path: '/backend',
            component: Backend,
            children:[
                {
                    path: '/backend',
                    redirect: 'individualManage' ,
                },
               
               {
                path:'individualManage',
                component:IndividualManage,
                meta:{
                    title:'个人信息'
                }
               },
               {
                path:'personnelManage',
                component:PersonnelManage,
                meta:{
                    title:'人员信息'
                }
               },
               {
                path:'placeManage',
                component:PlaceManage,
                meta:{
                    title:'地点管理'
                }
               },
               {
                path:'commentsManage',
                component:CommentsManage,
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
        console.log('加载路由')
        // store.dispatch('getPermissionsInfo').then(()=>{
        //     const dynamicRouteses =store.state.permissionsInfo
        //     dynamicRouteses.forEach(item=>{
        //         router.addRoute('home',{  
        //             path:item.routingPath,
        //             component: (resolve) => require([`@/${item.componentPath.replace(/(^\/*)/g, '')}/index.vue`], resolve),
        //             meta:{
        //                 title:item.menuName,
        //                 weight:item.menuWeight
        //             },
        //         })
        //     })       
        // })
    isToken=false
    }
  next()
})
export default router;


