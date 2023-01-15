<template>
  <div>
    <div class="main_head main_center">
      <div class="head_logo"></div>
      <div class="head_menu">
        <el-menu :default-active="activeIndex" mode="horizontal" router @select="handleSelect">
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
    <router-view></router-view>
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
    jumpMap() {
      this.$router.push({ path: "/map" });
    },
    handleSelect(e, r) {
      console.log(e, r)
      if (e == 5) this.$router.push({ path: "/backend" });

    },
  },
};
</script>
<style >
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


</style>