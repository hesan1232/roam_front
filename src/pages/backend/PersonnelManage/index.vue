<template>
  <el-card class="card">
    <el-button type="primary" @click="dialogVisible = true">新增</el-button>
    <el-table :data="userInfoList" border style="width: 100%" height="400"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
      <el-table-column type="index" label="序号" width="100px" align="center"></el-table-column>
      <el-table-column prop="userName" label="用户名" align="center"> </el-table-column>
      <el-table-column prop="type" label="类型" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.type == 0 ? '管理员' : '用户' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="nickName" label="昵称" align="center"> </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="updateDialog(scope.row)">编辑</el-button>&nbsp;&nbsp;|
          <el-button type="text" @click="deletFormInfo(scope.row)" class="deletecolor">注销</el-button>
          &nbsp;&nbsp;|
          <el-button type="text" @click="resetPassword(scope.row)" class="deletecolor">重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout=" ->,total, prev, pager, next" :total="total"
      @current-change="handleCurrentChange">
    </el-pagination>
    <el-dialog :title="dialogType == 1 ? '新增' : '编辑'" :visible.sync="dialogVisible" @close="dialogClose('ruleForm')">
      <el-form :model="updateFormInfo" :rules="rules" ref="ruleForm" label-position="left" label-width="120px">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="updateFormInfo.userName"></el-input>
        </el-form-item>

        <el-form-item label="昵称">
          <el-input v-model="updateFormInfo.nickName"></el-input>
        </el-form-item>
        <el-form-item label="头像地址" prop="ImgUrl">
          <el-input v-model="updateFormInfo.userAvater"></el-input>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import { reqGetUserList,reqDeleteUserInfo,reqResetUserPassword} from "@/api/user";
export default {
  data() {
    return {
      userInfoList: [],
      total: 0,
      searchInfo: {
        page: 1,
        size: 10,
      },
      dialogVisible: false,
      dialogType:1,
      updateFormInfo: {

      },
       //表单校验规则
       rules:{
        placeName: [
            { required: true, message: '请输入地点名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
          ],
          placeType: [
            { required: true, message: '请选择活动区域', trigger: 'blur' }
          ],
          placeXY: [
            {trigger: 'change',validator:(rule, value, callback)=>{
              if(this.updateFormInfo.placeX&& this.updateFormInfo.placeY)
              {
              const flag=Number(this.updateFormInfo.placeX)+Number(this.updateFormInfo.placeX)
              if(!isNaN(flag))
             callback()
              }else{
               callback(new Error('经纬度不能为空'))
              }
              callback(new Error('经纬度必须为数字'))
            }}
          ],
        
          ImgUrl:[
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ],
          description: [
            { required: true, message: '请填写地点说明', trigger: 'blur' }
          ]
        }
    };
  },
  mounted() {
    this.getUserList()
  },
  methods: {
    //获取地点列表
    getUserList() {
      reqGetUserList().then((res) => {
        this.userInfoList = res.data.userList;
        this.total=res.data.total
      });
    },
    //分页器的回调
    handleCurrentChange(val) {
      this.searchInfo.page = val
      // this.getPlaceList()
    },
    // 编辑信息的回调
    updateDialog(data) {
      this.updateFormInfo = data
      this.dialogVisible = true
      this.dialogType = 2
    },
    deletFormInfo(data) {
      this.$confirm(`你确定删除  ${data.userName}  ?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          reqDeleteUserInfo({id:data.id}).then(
            (res) => {
              this.getUserList()
              this.$message({
                type: "success",
                message: `删除${data.userName}成功`,
              });
            },
            (err) => {
              this.$message({
                type: "error",
                message: `删除${data.userName}失败`,
              });
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    resetPassword(data) {
      this.$confirm(`你确定重置  ${data.userName} 密码为 123456 ?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          reqResetUserPassword({id:data.id}).then(
            (res) => {
              this.getUserList()
              this.$message({
                type: "success",
                message: `重置${data.userName}成功`,
              });
            },
            (err) => {
              this.$message({
                type: "error",
                message: `重置${data.userName}失败`,
              });
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
     //弹窗关闭的回调
     dialogClose(formName){
      this.updateFormInfo={}
      this.dialogType=1
      this.$nextTick(()=>{
        this.$refs[formName].clearValidate()
      })
      
    },
  },
};
</script>

<style>
.card {
  padding: 20px;
}

.el-table {
  margin-top: 20px;
}
</style>