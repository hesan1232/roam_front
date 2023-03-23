<template>
  <el-card class="card">
    <el-button type="primary" @click="dialogVisible = true">新增</el-button>
    <el-table :data="userInfoList" border style="width: 100%" height="450"
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
    <el-pagination background layout=" ->,total, prev, pager, next" :total="total" @current-change="handleCurrentChange">
    </el-pagination>
    <el-dialog :title="dialogType == 1 ? '新增' : '编辑'" :visible.sync="dialogVisible" @close="dialogClose('ruleForm')">
      <el-form :model="updateFormInfo" :rules="rules" ref="ruleForm" label-position="left" label-width="120px">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="updateFormInfo.userName"></el-input>
        </el-form-item>

        <el-form-item label="昵称" prop="nickName">
          <el-input v-model="updateFormInfo.nickName"></el-input>
        </el-form-item>
        <el-form-item label="头像" >
          <el-upload class="upload-demo" list-type="picture-card" action="#" :http-request="uploadAvater" :file-list="fileList" :class="{disabled:uploadClass}"
            :on-preview="handlePreview" :on-remove="handleRemove" :on-change="handlehCangeUpload" :limit="1">
            <i class="el-icon-upload"></i>
            <div class="el-upload__tip" slot="tip">仅支持jpg、jpeg、png格式的图片</div>
          </el-upload>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogImage">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </el-card>
</template>

<script>
import { reqGetUserList, reqUserRegister, reqDeleteUserInfo, reqResetUserPassword, reqUpdateUserInfo } from "@/api/user";
import { reqUpLoadImage } from "@/api/upLoad"
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
      dialogType: 1,
      updateFormInfo: {

      },
      //表单校验规则
      rules: {
        userName: [
          { required: true, message: '请填写用户账户', trigger: 'blur' }
        ],
        nickName: [
          { required: true, message: '请填写用户昵称', trigger: 'blur' }
        ],
      },
      //上传图片
      fileList: [],
      dialogImageUrl: '',
      dialogImage: false,
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
        this.total = res.data.total
      });
    },
    //增加用户
    addUser() {
      reqUserRegister(this.updateFormInfo).then(() => {
        this.getUserList()
        this.$message.success('新增成功')
      })
    },
    //更新用户信息
    updateUserInfo() {
      reqUpdateUserInfo(this.updateFormInfo).then(() => {
        this.getUserList()
        this.$message.success('编辑成功')
      })
    },
    //分页器的回调
    handleCurrentChange(val) {
      this.searchInfo.page = val
      // this.getPlaceList()
    },
    //更新弹窗确认回调
    updateForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogVisible = false
          this.dialogType == 1 ? this.addUser() : this.updateUserInfo()
        } else {

          return false;
        }
      });
    },
    // 编辑信息的回调
    updateDialog(data) {
      this.updateFormInfo = data
      this.fileList=[{name:this.updateFormInfo.nickName,url:this.updateFormInfo.userAvater}]
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
          reqDeleteUserInfo({ id: data.id }).then(
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
          reqResetUserPassword({ id: data.id }).then(
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
    dialogClose(formName) {
      this.updateFormInfo = {}
      this.dialogType = 1
      this.$nextTick(() => {
        this.$refs[formName].clearValidate()
      })

    },
    handlehCangeUpload(file) {
      let formData = new FormData();
      formData.append('file', file.raw);//键名要和后台一致
      this.upLoadImage(formData)
    },
    uploadAvater(file) {
    },
     //触发图片预览
     handlePreview(file) {
      this.dialogImage = true;
      this.dialogImageUrl = file.url;
    },
     //触发图片删除
     handleRemove(file){
       this.fileList=[]
    },
    //上传图片
    upLoadImage(data) {
      reqUpLoadImage(data).then((res) => {
        this.updateFormInfo.ImgUrl = res.data.imgUrl
        this.$message.success('上传成功')
      })
    }
    
  },
  computed:{
    uploadClass(){
      return this.fileList.length==1
    },
  }
};
</script>

<style scoped>
.card {
  height: 600px;
}

.el-table {
  margin: 10px 0;
}
::v-deep .disabled .el-upload.el-upload--picture-card {
    display: none !important;
}

::v-deep  .disabled .el-button--success.is-plain {
    display: none !important;
}

</style>