<template>
  <div>
    <div class="main_head main_center">
      <div class="head_logo"></div>
      <div class="head_menu">
        <el-menu :default-active="activeIndex" background-color="#04305c" mode="horizontal" router >
          <el-menu-item index="homepage">首页</el-menu-item>
          <el-menu-item index="/backend">我的工作台</el-menu-item>
          <el-menu-item index="/map">新生指引</el-menu-item>
        </el-menu>
      </div>
      <div class="head_user">
        <el-avatar :src="userInfo.userAvater" class="user_avater">
        </el-avatar>
        <div class="user_name">
          <span v-if="userInfo.nickName">{{ userInfo.nickName }}</span>
          <span v-else>登录 | 注册</span>
        </div>
      </div>
    </div>
    <div class="main_body main_center">
      <el-card class="body_left"></el-card>
      <div></div>
      <el-card class="body_right"></el-card>
      <el-card class="body_right"></el-card>
    </div>
 
    
    <HomeFooter />
  </div>
</template>
<script>
import HomeFooter from '@/pages/home/homeFooter'
import { getToken } from '@/api/token'
export default {
  components: { HomeFooter },
  data() {
    return {
      userInfo:{},
      activeIndex: '1',
      isLogin: getToken()
    };
  },
  mounted() {
    this.$store.dispatch('getUserInfo').then(()=>{
      this.userInfo=this.$store.state.userInfo
    })
  },
  methods: {
   
  },
};
</script>
<style >
.main_center {
  margin: 0 auto;
}

/* 头部 */
.main_head {
  
  height: 60px;
  margin-top: 1px;
  padding: 0 220px;
  color: white;
  background-color: #04305c;
  z-index: 10;
}

.head_logo {
  width: 150px;
  height: 100%;
  margin-right: 60px;
  display: inline-block;
  background: url(@/assets/hncjLogo.png) no-repeat;
}

.head_menu {
  height: 100%;
  display: inline-block;
}

.head_user {
  width: 250px;
  height: 100%;
  float: right;
  vertical-align: top;
}

.user_avater {
  display: inline-block;
  margin: 10px 10px;
}

.user_name {
  height: 100%;
  width: 100px;
  line-height: 60px;
  display: inline-block;
  vertical-align: top;
  color: white;
}
.main_body{
  width: 1000px;
  height: 600px;
  padding: 10px 0;
}
.body_left{
  width: 600px;
  height: 100%;
  float: left;
}
.body_right{
  width: 300px;
  height: 300px;
  float: left;
}
</style>