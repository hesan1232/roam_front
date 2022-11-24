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
      <HomeFooter/>
    </div>
</template>
<script>
import HomeFooter from '@/components/Home/homeFooter'
export default {
  components:{HomeFooter},
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
  position: sticky;
  
  top: 0;
  margin-top: 1px;
  padding: 0 20px;
  color: white;
  z-index: 10;
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
/* .head_menu li{
  border-radius: 0px;
} */
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



</style>