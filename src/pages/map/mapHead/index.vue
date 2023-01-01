<template>
  <div class="map_head">
      <div class="head_logo">
        <img src="@/assets/logo.png" alt="logo" />
      </div>
      <div class="head_user">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        <el-tag size="mini">管理员</el-tag>
        <span size="mini">{{ userInfo.userName }}</span>
      </div>
    </div>
</template>

<script>
import { reqGetUserInfo } from "@/api/user";
export default {
  data(){
    return {
        //用户信息
      userInfo: {},
    }
  },
  methods:{
     //获取个人信息
     getUserInfo() {
      reqGetUserInfo().then((res) => {
        this.userInfo = res.data
      });
    },
  }
}
</script>

<style scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.main {
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
}

.map_head {
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 10px 30px;
  background-color: rgb(10, 150, 235);
  align-items: center;
  font-size: 12px;
  overflow: hidden;
}

/* .head_logo {
} */
.head_user {
  vertical-align: middle;

}

.head_user span {
  vertical-align: middle;
  margin-left: 20px;
}

</style>