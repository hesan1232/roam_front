<template>
  <div class="main">
    <div class="main_head main_center">
      <div class="head_logo"></div>
      <div class="head_menu">
        <el-menu :default-active="activeIndex" background-color="#005bac" mode="horizontal" router text-color="#fff">
          <el-menu-item index="/backend">我的工作台</el-menu-item>
          <el-menu-item index="/map">新生指引</el-menu-item>
        </el-menu>
      </div>
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
    <div class="main_body main_center">

      <div class="body_left">
        <el-card class="body_lt" shadow="hover">
          <h1>地点分类</h1>
          <ul class="bd_list">
            <li class="bd_item" v-for="item in placeTypeList" :key="item.id">
              <img :src="require('@/assets/icon/' + `${item.url}.png`)" alt="">
              <p>{{ item.placeType }}</p>
            </li>

          </ul>
        </el-card>
        <el-card class="body_lb" shadow="hover">
          <h1>工作台</h1>
          <ul class="bd_list">
            <li class="bd_item" v-for="item in permissionsInfo" :key="item.id" @click="goBackend">
              <img :src="require('@/assets/icon/' + `${item.url}.png`)" alt="">
              <p>{{ item.title }}</p>
            </li>

          </ul>
        </el-card>
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
        <el-card class="body_rt" shadow="hover">

        </el-card>
        <el-card class="body_rb" shadow="hover">
          <div slot="header" class="clearfix">
            <span>热门搜索</span>
            <el-button style="float: right; font-size: 20px; padding: 3px 0;border: none;"
              icon="el-icon-refresh-right"></el-button>
          </div>
          <div v-for="item, index in hotSearch" :key="item.id" class="list"
            :class="{ last: index + 1 == hotSearch.length }" @click="goMap(item)">
            <span class="index" :class="'index' + (index + 1)">{{ index+ 1}}</span>
            <div class="label">{{ item.placeName }}</div>
            <div class="value">{{ item.number || 0 }}人</div>

          </div>
          <el-empty v-if="!hotSearch.length" description="描述文字"></el-empty>
        </el-card>
      </div>
    </div>

    <div class="main_footer">
      <div class="main_footer_content main_center">
        <div class="footer_info">
          <dl class="footer_info_intro footer_info_left">
            <dt>河南城建学院漫游指南</dt>
            <dd>城建学子用得更多的漫游网站</dd>
          </dl>
          <dl class="footer_info_about footer_info_left">
            <dd>
              <a href="#">关于城建</a>
            </dd>
            <dd>
              <a href="#">联系我们</a>
            </dd>

          </dl>
          <dl class="footer_info_about footer_info_left">

            <dd>
              <a href="#">隐私政策</a>
            </dd>
            <dd>
              <a href="#">服务协议</a>
            </dd>
          </dl>
        </div>
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

      ]
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
      }else{
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.main_center {
  margin: 0 auto;
}

/* 头部 */
.main_head {
  width: 100%;
  height: 60px;
  color: white;
  background-color: #005bac;
  z-index: 10;
}

.head_logo {
  width: 240px;
  height: 100%;
  margin-left: 300px;
  display: inline-block;
  background: url(@/assets/logo_1.png) no-repeat;
  background-size: cover;
}

.head_menu {
  height: 100%;
  display: inline-block;
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
  height: 500px;
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

.body_lt {
  height: 46%;
}

.body_lb {
  height: 27%;
}

.body_rt {
  height: 20%;
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

/* 底部区域 */
.main_footer {
  clear: both;
  background-color: #005bac;
  color: #c2c2c2;
  line-height: 22px;
  font-size: 12px;
}

.main_footer_content {
  width: 1000px;
  height: 100px;

  display: block;
  overflow: hidden;
}

.footer_info {
  padding: 10px 8px;
  overflow: hidden;
}

.footer_info dt {
  height: 20px;
  font-size: 14px;
  overflow: hidden;
}

.footer_info_intro {
  width: 200px;
  margin-right: 200px;
}

.footer_info_about {
  width: 128px;
  margin-right: 150px;
}

.footer_info_about a {
  color: #c2c2c2;
  list-style: none;
}

.footer_info_code {
  float: right;
  padding-top: 22px;
  line-height: 1.4em;
}

.footer_info_left {
  float: left;
}

/* 折线图 */
/* #category{
  width: 100%;
  height: 300px;
} */
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