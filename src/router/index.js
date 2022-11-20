import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
//引入组件
import Login from '@/components/Login'
import Home from '@/components/Home'
  import Academy from '@/pages/home/academy'
  import History from '@/pages/home/history'
  import HomePage from '@/pages/home/homePage'
  import Place from '@/pages/home/place'
import Map from "@/components/Map"
import Backend from "@/components/Backend"
  import CommentsManage from "@/pages/backend/CommentsManage"
  import IndividualManage from "@/pages/backend/IndividualManage"
  import PersonnelManage from "@/pages/backend/PersonnelManage"
  import PlaceManage from "@/pages/backend/PlaceManage"
  

export default new VueRouter({
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
                    path: 'academy',
                    component: Academy,  
                },
                {
                    path: 'history',
                    component: History,  
                },
                {
                    path: 'homepage',
                    component: HomePage,  
                },
                {
                    path: 'place',
                    component: Place,  
                },
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

