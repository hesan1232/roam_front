<template>
  <el-card
    class="card" 
  >
    <el-button type="primary" @click="editUserData">编辑</el-button>
    <el-table :data="[userInfo]" border style="width: 100%" :header-cell-style="{ background:'#eef1f6',color:'#606266'}">
      <el-table-column type="index" label="序号" width="100px" align="center"></el-table-column>
      <el-table-column prop="userName" label="用户名"> </el-table-column>
      <el-table-column prop="type" label="类型"> </el-table-column>
      <el-table-column prop="nickName" label="昵称"> </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { reqGetUserInfo } from "@/api/user";
export default {
  data() {
    return {
      userInfo: {},
    };
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    //获取个人信息
    getUserInfo() {
      reqGetUserInfo().then((res) => {
        this.userInfo = res.data;
        console.log(this.userInfo);
      });
    },
    editUserData(){
      console.log('我要去编辑了')
    },
  },
};
</script>

<style scoped>
.card{
  height: 600px;
}
.el-table{
  margin: 10px 0;
}
</style>