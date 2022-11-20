<template>
  <div>
      <div class="main_head main_center">
        <div class="head_logo"></div>
        <div class="head_menu">
          <el-menu
            :default-active="activeIndex"
            mode="horizontal"
            router
            @select="handleSelect"
           
          >
            <el-menu-item index="homepage">首页</el-menu-item>
            <el-menu-item index="place">校园风光</el-menu-item>
            <el-menu-item index="history">校园历史</el-menu-item>
            <el-menu-item index="academy">专业介绍</el-menu-item>
            <el-menu-item index="/backend">我的工作台</el-menu-item>
            <el-menu-item index="/map">新生指引</el-menu-item>
          </el-menu>
        </div>
        <div class="head_user">
          <el-avatar style="display: inline-block; margin: 10px 10px">
            无
          </el-avatar>
          <div class="head_user_black">
            <span>登录</span>
            <span>|</span>
            <span>注册</span>
            
          </div>

        </div>
      </div>
      <router-view></router-view>
      <div class="main_footer">
        <div class="main_footer_content main_center">
          <div class="footer_info">
            <dl class="footer_info_intro footer_info_left">
              <dt>河南城建学院漫游指南</dt>
              <dd>城建学子用得更多的漫游网站</dd>
              <dd>上亿旅行者共同打造的<strong>"旅行神器"</strong></dd>
              <dd> 多个<strong>"食堂自习室"</strong>目的地</dd>
             
            </dl>
            <dl class="footer_info_about footer_info_left">
              <dt>关于我们</dt>
              <dd>
                <a href="#">关于马蜂窝</a>
              </dd>
              <dd>
                <a href="#">联系我们</a>
              </dd>
              <dd>
                <a href="#">隐私政策</a>
              </dd>
              <dd>
                <a href="#">服务协议</a>
              </dd>
            </dl>
            <dl class="footer_info_code">
              <dd>
                <span class="ft-qrcode-tejia"></span>
                <p>马蜂窝良品<br />官方服务号</p>
              </dd>
              <dd>
                <p>马蜂窝APP<br />扫描立即下载</p>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
        activeIndex: '1',
            
    };
  },
  mounted() {},
  methods: {
    jumpMap() {
      this.$router.push({ path: "/map" });
    },
    handleSelect(e,r){
     console.log(e,r)
     if(e==5) this.$router.push({ path: "/backend" });
     
    },
  },
};
</script>
<style scoped>
body {
  background-color: rgb(230, 230, 230);
}

.main_center {
  margin: 0 auto;
}

/* 头部 */
.main_head {
  width: 1140px;
  height: 60px;
  margin-top: 1px;
  padding: 0 20px;
  color: white;
  /* background-color:#0a96eb; */
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
.head_menu li{
  border-radius: 0px;
}
.head_user {
  width: 200px;
  height: 100%;
  float: right;
  vertical-align: top;
}

.head_user_black {
  height: 100%;
  line-height: 60px;
  display: inline-block;
  color: #000000;
}
.head_user_black span{
  margin: 0 3px;
}
/* 轮播图 */

/* 底部区域 */
.main_footer {
  height: 300px;
  background-color: rgb(136, 135, 135);
  clear: both;
  background-color: #3c3c3c;
  color: #c2c2c2;
  line-height: 22px;
  padding-bottom: 20px;
  font-size: 12px;
}

.main_footer_content {
  width: 1000px;
  height: 300px;

  display: block;
  overflow: hidden;
}

.footer_info {
  padding: 30px 8px 40px 8px;
  border-bottom: 1px solid #575a5b;
  overflow: hidden;
}

.footer_info dt {
  height: 30px;
  font-size: 14px;
  overflow: hidden;
}

.footer_info_intro {
  width: 200px;
  margin-right: 68px;
}

.footer_info_about {
  width: 128px;
  margin-right: 85px;
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

.footer_info_intro strong {
  color: #ff9d00;
  font-weight: normal;
}
</style>