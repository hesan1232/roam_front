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

.map_head {
  height: 72px;
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
  background-color: #005bac;
  align-items: center;
  font-size: 12px;
  overflow: hidden;
}

.head_user {
  vertical-align: middle;
  margin-right: 60px;
}

.head_user span {
  vertical-align: middle;
  margin-left: 10px;
}

</style>