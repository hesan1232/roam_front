<template>
  <div class="main">
    <div class="main_head main_center">
      <div class="head_logo"></div>
      <div class="head_menu">
        <el-menu :default-active="activeIndex" background-color="#04305c" mode="horizontal" router >
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
      <div class="body_right">
        <el-card class="body_item"></el-card>
        <el-card  class="body_item"></el-card>
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

import { getToken } from '@/api/token'
export default {
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
<style scoped>
.main{
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
  width: 150px;
  height: 100%;
  margin-left: 300px;
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
  height: 580px;
  background-color: blanchedalmond;
}
.body_left{
  width: 600px;
  height: 100%;
  float: left;
}
.body_right{
  width:390px;
  height: 100%;
  background-color: pink;
  float: right;
}
.body_item{
  height: 50%;
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

</style>