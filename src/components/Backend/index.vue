<template>
  <div class="main_container">
    <el-header class="main_head">
      <div class="main">
        <el-aside width="auto">
          <div style="margin: auto" class="aside_img">
            <div @click="jumpHome" class="aside_icon">后台</div>
          </div>
          <el-menu
            text-color="#fff"
            background-color="#409EFF"
            class="el-menu-vertical-demo"
            :router="true"
          >
            <el-menu-item
              v-for="item in permissionsInfo"
              :key="item.id"
              :index="item.routingPath"
            >
              <i :class="item.menuIcon"></i>
              <span slot="title">{{ item.menuName }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <div class="main_right">
          <div class="right_top">
            <!-- 导航面包屑 -->
            <el-breadcrumb class="app-breadcrumb" separator="/">
              <transition-group name="breadcrumb">
                <el-breadcrumb-item
                  v-for="item in levelList"
                  :key="item.path"
                  :to="{ path: item.path }"
                >
                  <span>{{ item.meta.title }}</span>
                </el-breadcrumb-item>
              </transition-group>
            </el-breadcrumb>

            <div class="head_user">
              <el-avatar
                class="user_img"
                :src="userInfo.userAvater"
              >
              </el-avatar>
              <span>
                {{ userInfo.nickName || "未登录" }}
              </span>
              <el-dropdown trigger="click" click="user-dropdown">
                <span
                  class="el-dropdown-link"
                  style="display: inline-block; text-align: center"
                >
                  <el-tag type=""  >
                    {{ userInfo.type==0?"管理员":"普通用户" }}</el-tag
                  >
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>

                <el-dropdown-menu slot="dropdown" class="user_dropdown">
                  <el-dropdown-item>
                    <p @click="LoginOut">退出登录</p>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <div class="right_main">
            <transition :name="SkipSwitchName">
              <router-view :userInfo="userInfo"></router-view>
            </transition>
          </div>
        </div>
      </div>
    </el-header>
  </div>
</template>

<script>
import { removeToken } from "@/api/token"
export default {
  data() {
    return {
      //用户属性
      userInfo: this.$store.state.userInfo,
      //面包屑
      levelList: null,
      //用户权限信息
      permissionsInfo: [
        {
          id: "1",
          routingPath: "individualManage",
          menuIcon: "el-icon-user",
          menuName: "个人信息",
        },
        {
          id: "2",
          routingPath: "personnelManage",
          menuIcon: "el-icon-s-custom",
          menuName: "人员管理",
        },
        {
          id: "3",
          routingPath: "placeManage",
          menuIcon: "el-icon-s-promotion",
          menuName: "地点管理",
        },
        {
          id: "4",
          routingPath: "commentsManage",
          menuIcon: "el-icon-s-comment",
          menuName: "评论管理",
        },
      ],
      //监听路由名称
      SkipSwitchName: "",
    };
  },
  mounted(){

    this.getBreadcrumb()
  },
  methods: {
    //跳转前台
    jumpHome(){
      this.$router.push('/home')
    },
    //退出登录
    LoginOut() {
      removeToken()
      this.$router.push({ path: "/login" })
    },
    //改变面包屑
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]
      if (!this.isIndex(first)) {
        matched = [{ path: '/backend', meta: { title: '首页' } }].concat(matched)
        this.levelList = matched
      } else {
        this.levelList = [{ path: '/backendme', meta: { title: '首页' } }]
      }
    },
    isIndex(route) {
      const redirect = route && route.redirect
      if (!redirect) {
        return false
      }
      return redirect === '/home'
    },
  },
  watch: {
    $route(to, from) {
      if (to.meta.weight > from.meta.weight) {
        this.SkipSwitchName = "Skright";
      } else {
        this.SkipSwitchName = "Skleft";
      }
      this.getBreadcrumb()
    },
  }
};
</script>

<style scoped>
/* 整个容器 */
.main_container {
  background: #fafafa;
}

/* 头部区域 */
.el-header {
  width: 100vw;
  height: 76px !important;
  padding: 0px;
  background-color: #ffffff;
  color: #333;
  box-shadow: 0px 0px 12px 0px rgba(124, 186, 244, 0.4),
    0px 0px 12px 0px rgba(0, 0, 0, 0.05);
}

/* 主盒子 */
.main {
  display: flex;
  flex-direction: row;
  overflow: hidden;
}
/* 左侧导导航栏 */
.el-aside {
  max-width: 180px;
  height: 670px;
  margin: 20px;
  background: #409EFF;
  box-shadow: 0px 0px 12px 0px #66b0ffba,
    0px 0px 12px 0px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  overflow-x: hidden;
  z-index: 100;
}
.el-menu-vertical-demo {
  padding: 0px;
  margin: 0 10px;
}
.aside_img {
  max-width: 160px;
  text-align: center;
  color: white;
}
.aside_icon {
  height: 40px;
  line-height: 40px;
  margin: 50px 0;
  border-radius: 20px;
  background-color: #69b1ff;
}
.el-menu {
  border: none;
}

.el-aside .el-menu-item,
.el-submenu__title {
  height: 40px;
  line-height: 40px;
}
.el-menu .el-menu-item,
.el-tooltip {
  max-width: 160px;
  padding: 0px 12px !important;
}
.el-menu i {
  color: #ffffff !important;
}
.el-menu-item.is-active {
  color: #ffffff;
}
.aside_bottom {
  margin-top: 230px;
  text-align: center;
}
.el-submenu__title:hover,
.el-menu-item:focus,
.el-menu-item:hover {
  background: #69b1ff !important;
  border-radius: 12px;
  box-shadow: 0px 0px 12px 0px rgba(123, 128, 227, 0.4);
}

/* 是否展开侧边栏类名 */
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
}

/* 取消router-link样式 */
.router-link-active {
  text-decoration: none;
  color: #fff;
}

/* 右侧主内容盒子 */
.main_right {
  flex: 1;
  height: 650px;
}

.right_top {
  width: 100%;
  height: 76px;
  line-height: 76px;

}
.el-breadcrumb {
  line-height: 76px;
  display: inline-block;
  float: left;
}
.head_user {
  margin-right: 20px;
  width: 200px;
  font-size: 14px;
  float: right;
}

.user_img {
  display: inline-block;
  vertical-align: middle;
  border-radius: 16px;
}

/* 路由跳转动画 */
.Skright-enter-active,
.Skright-leave-active,
.Skleft-enter-active,
.Sklef-leave-active {
  transition: all 600ms;
}

.Skright-enter {
  transform: translate3d(-100%, 0, 0);
}
.Skright-leave-to {
  transform: translate3d(100%, 0, 0);
}
.Skleft-enter {
  transform: translate3d(100%, 0, 0);
}

.Skleft-leave-to {
  transform: translate3d(-100%, 0, 0);
}
/* 路由页面 */
.right_main {
  width:1300px;
  margin-top: 10px;
  margin-right: 20px;
}
</style>