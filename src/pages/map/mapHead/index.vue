<template>
  <div class="map_head">
    <router-link to="/home">
      <div class="head_logo">
        <img src="@/assets/logo.png" alt="logo" />
      </div>
    </router-link>

    <div class="head_user">
      <el-popover placement="top-start" trigger="hover">
        <img   class="code_out" src="@/assets/out.jpg" alt="">
        <img style="width: 42px; vertical-align: middle;" slot="reference" class="codeImage" src="@/assets/code.png" alt="二维码" />
        <span slot="reference" style="color:white;font-size: 14px;">移动端</span>
      </el-popover>
    
      <el-avatar class="user_img" :src="userInfo.userAvater">
      </el-avatar>

      <el-dropdown trigger="click" click="user-dropdown">
        <span class="el-dropdown-link" style="color:white">
          {{ userInfo.nickName || "未登录" }}
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
</template>

<script>
import { removeToken } from "@/api/token"
export default {
  data() {
    return {
      //用户信息
      userInfo: this.$store.state.userInfo,
      visible: false,
    }
  },
  methods: {
    //退出登录
    LoginOut() {
      removeToken()
      this.$router.push({ path: "/login" })
    },
    goBackend() {
      this.$router.push('/backend')
    }
  }
}
</script>

<style scoped>
.map_head {
  height: 72px;
  display: flex;
  justify-content: space-between;
  padding: 5px 30px;
  background-color: #005bac;
  /* background: rgb(0,91,172);
background: linear-gradient(90deg, rgba(0,91,172,1) 42%, rgba(0,172,197,1) 83%); */
  align-items: center;
  font-size: 12px;
  overflow: hidden;
  color: white;
}

.head_user {
  vertical-align: middle;
  margin-right: 60px;
}

.head_user span {
  vertical-align: middle;
  margin-left: 10px;
}

.codeImage {
  width: 38px;
}

.code_out {
  width: 200px;
}
</style>