<template>
  <div class="main">
    <div class="main_head main_center">
      <div class="head_logo"></div>
      <div class="head_user">
        <el-avatar :src="userInfo.userAvater" class="user_avater">
        </el-avatar>
        <el-dropdown trigger="click" click="user-dropdown">
          <span class="el-dropdown-link" style="color:white">
            {{ userInfo.nickName }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>

          <el-dropdown-menu slot="dropdown" class="user_dropdown">
            <el-dropdown-item>
              <p @click="goBackend">工作台</p>
            </el-dropdown-item>
            <el-dropdown-item>
              <p @click="LoginOut">退出登录</p>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

      </div>
    </div>
    <div class="search"><el-input v-model="search" placeholder=""></el-input></div>
    <div class="bddy_t">
      <ul class="t_list">
        <li class="t_item" v-for="item in placeTypeList" :key="item.id">
          <div style="background-color: white;border-radius: 5px;"> <img :src="require('@/assets/icon/' + `${item.url}.png`)" alt="">
          </div>

          <p>{{ item.placeType }}</p>
        </li>

      </ul>
    </div>
    <div class="main_body main_center">

      <div class="body_left">
        <el-card class="body_lb" shadow="hover">
          <h1>系统管理</h1>
          <ul class="bd_list">
            <li class="bd_item" @click="goMap()">
              <img src="@/assets/icon/map-road.png" alt="">
              <p>新生指引</p>
            </li>
            <li class="bd_item" @click="goBackend">
              <img src="@/assets/icon/system.png" alt="">
              <p>工作台</p>
            </li>
            <li class="bd_item" @click="LoginOut">
              <img src="@/assets/icon/power.png" alt="">
              <p>退出登录</p>
            </li>
          </ul>

        </el-card>
      </div>
      <div class="body_right">
        <el-card class="body_rb" shadow="hover">
          <div slot="header" class="clearfix">
            <span>热门搜索</span>
            <el-button style="float: right; font-size: 20px; padding: 3px 0;border: none;"
              icon="el-icon-refresh-right"></el-button>
          </div>
          <div v-for="item, index in hotSearch" :key="item.id" class="list"
            :class="{ last: index + 1 == hotSearch.length }" @click="goMap(item)">
            <span class="index" :class="'index' + (index + 1)">{{ index + 1 }}</span>
            <div class="label">{{ item.placeName }}</div>
            <div class="value">{{ item.number || 0 }}人</div>

          </div>
          <el-empty v-if="!hotSearch.length" description="描述文字"></el-empty>
        </el-card>
      </div>
    </div>

</div>
</template>
<script>

import { getToken, removeToken } from '@/api/token'
import { reqGetUserInfo } from "@/api/user"
import { reqGetPlaceTypeList } from "@/api/place"
import { reqGetRouterList } from "@/api/router"
export default {
  data() {
    return {
      userInfo: {},
      activeIndex: '1',
      isLogin: getToken(),
      //分类
      placeTypeList: {},
      //工作台
      permissionsInfo: [],
      //热门搜索
      hotSearch: [
        {
          id: 1,
          placeName: '十号楼',
          number: 23
        },
        {
          id: 2,
          placeName: '八号楼',
          number: 19
        },
        {
          id: 3,
          placeName: '图书馆',
          number: 12
        },
        {
          id: 4,
          placeName: '五环运动场',
          number: 8
        },
        {
          id: 5,
          placeName: '体育馆',
          number: 5
        },
        {
          id: 6,
          placeName: '北门',
          number: 2
        },

      ],
      search:[]
    };
  },
  created() {
    this.getPlaceTypeList()
    this.getRouterList()
    // this.$store.dispatch('getUserInfo').then((result) => {
    //   this.userInfo = this.$store.state.userInfo
    // })
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    //获取信息
    getUserInfo() {
      reqGetUserInfo().then((result) => {
        this.userInfo = result.data
      })
    },
    //获取分类列表
    getPlaceTypeList() {
      reqGetPlaceTypeList().then(res => {
        this.placeTypeList = res.data

      })
    },
    //获取权限信息
    getRouterList() {
      reqGetRouterList().then(result => {
        this.permissionsInfo = result.data
      })
    },
    goMap(data) {
      if (data) {
        this.$router.push({
          path: '/map', params: {
            placeName: data.placeName
          }
        })
      } else {
        this.$router.push({
          path: '/map',
        })
      }

    },
    //退出登录
    LoginOut() {
      removeToken()
      this.$router.push({ path: "/login" })
    },
    goBackend() {
      this.$router.push('/backend')
    }
  },
};
</script>
<style scoped >
.main {
  width: 100vw;
  height: 100vh;
  background: url(@/assets/login/login_bg1.jpg);
  background-size: cover;
  overflow: hidden;
}

.main_center {
  margin: 0 auto;
}

/* 头部 */
.main_head {
  width: 100%;
  height: 60px;
  color: white;
  margin: 60px 0;

}

.head_logo {
  width: 240px;
  height: 100%;
  margin-left: 100px;
  display: inline-block;
  background: url(@/assets/logo_1.png) no-repeat;
  background-size: cover;
}
.head_user {
  height: 100%;
  float: right;
  vertical-align: middle;
  margin-top: 10px;
  margin-right: 160px;
}

.head_user span {
  vertical-align: middle;
  margin-left: 10px;
}

.main_body {
  width: 1000px;
  height: 400px;
  margin-top:40px ;
}
.search{
  width: 800px;
  margin: 0 auto;
}
.body_left {
  width: 600px;
  height: 100%;
  float: left;
}

.body_right {
  width: 390px;
  height: 100%;
  float: right;
}

.bddy_t {
  width: 750px;
  margin: 0 auto;
  margin-top:20px ;
  backdrop-filter: blur(10px) !important; 
  -webkit-backdrop-filter: blur(8px);
  border-radius:10px;
  padding-top:10px ;
}
.t_list{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 10px;
}
.t_item{
  width: 50px;
  height: 60px;
  margin: 0 10px;
  text-align: center;
  cursor: pointer;
}

.t_item img {
  height: 30px;
}
.t_item  p {
  font-size: 14px;
    backdrop-filter: blur(10px);
  color: #fff;
}

.body_lb {
  height: 160px;
}


.body_rb {
  height: 80%;
}

.bd_list {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 10px;
}

.bd_item {
  width: 90px;
  height: 90px;
  margin: 0 10px;
  text-align: center;
  cursor: pointer;
}

.bd_item img {
  height: 45px;
}

.bd_item p {
  font-size: 14px;
}

/* 热门搜索 */
.section {
  width: 100%;
  height: 100%;
}

.list {
  padding: 5px 0;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
}

.last {
  border-bottom: none;
}

.index {
  color: #fff;
  text-align: center;
  width: 20px;
  height: 20px;
  line-height: 20px;
  background: #9195A3;
  border-radius: 4px;
}

.index1 {
  background: #FE2D46;
}

.index2 {
  background: #F60;
}

.index3 {
  background: #FAA90E;
}

.label {
  flex: 2;
  margin-left: 5px;
}

.value {
  flex: 1;
  text-align: right;
}
</style>