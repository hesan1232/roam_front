<template>
  <div class="map_head">
      <div class="head_logo">
        <img src="@/assets/logo.png" alt="logo" />
      </div>
      <div class="head_user">
        <el-avatar :src="userInfo.userAvater"></el-avatar>
        <span >{{ userInfo.nickName }}</span>
      </div>
    </div>
</template>

<script>

export default {
  data(){
    return {
        //用户信息
      userInfo: this.$store.state.userInfo,
    }
  },
  methods:{
    
   
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
  margin-top: 30px;
}

.head_user span {
  vertical-align: middle;
  margin-left: 10px;
}

</style>