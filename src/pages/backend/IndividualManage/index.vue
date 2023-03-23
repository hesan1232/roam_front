<template>
  <el-card class="card">
    <el-image style="width: 100px; height: 100px" :src="userInfo.userAvater" fit="fit"></el-image>
    <el-descriptions class="margin-top" title="详细信息" :column="1">
      <template slot="extra">
        <el-button type="primary" @click="editUserData">编辑</el-button>
      </template>
      <el-descriptions-item label="用户名">{{ userInfo.userName }}</el-descriptions-item>
      <el-descriptions-item label="昵称">{{ userInfo.nickName }}</el-descriptions-item>
      <el-descriptions-item label="身份">
        <el-tag v-if="userInfo.type == 0" size="small">管理员</el-tag>
        <el-tag v-if="userInfo.type == 1" size="small">普通用户</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="权限">
        <el-tag size="small">个人信息管理</el-tag>
        <el-tag size="small" v-if="userInfo.type == 0">用户信息管理</el-tag>
        <el-tag size="small" v-if="userInfo.type == 0">地点信息管理</el-tag>
        <el-tag size="small" v-if="userInfo.type == 0">评论信息管理</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="密码">略</el-descriptions-item>

      <el-descriptions-item label="头像地址">{{ userInfo.userAvater }}</el-descriptions-item>

    </el-descriptions>
    <el-dialog title="编辑" :visible.sync="dialogVisible" @close="dialogClose('ruleForm')">
      <el-form :model="updateFormInfo" :rules="rules" ref="ruleForm" label-position="left" label-width="120px">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="updateFormInfo.userName"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="updateFormInfo.nickName"></el-input>
        </el-form-item>
        <el-form-item label="头像">
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
import { reqUpdateUserInfo } from "@/api/user";
import { reqUpLoadImage } from "@/api/upLoad"
import lodash from 'lodash'
export default {
  data() {
    return {
      //表单数据
      dialogVisible: false,
      updateFormInfo: {},
      //表单校验规则
      rules: {
        userAvater: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ],
      },
      //上传图片
      fileList: [],
      dialogImageUrl: '',
      dialogImage: false,
    };
  },
  methods: {
    editUserData() {
      this.updateFormInfo = lodash.cloneDeep(this.userInfo)
      this.fileList=[{name:this.updateFormInfo.nickName,url:this.updateFormInfo.userAvater}]
      this.dialogVisible = true
    },
    //更新用户信息
    updateUserInfo() {
      reqUpdateUserInfo(this.updateFormInfo).then(() => {
        this.$store.dispatch('getUserInfo')
        this.$message.success('编辑成功')
      })
    },
    //更新弹窗确认回调
    updateForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogVisible = false
          this.updateUserInfo()
        } else {

          return false;
        }
      });
    },
    //弹窗关闭的回调
    dialogClose(formName) {
      this.updateFormInfo = {}
      this.fileList=[]
      this.dialogType = 1
      this.$nextTick(() => {
        this.$refs[formName].clearValidate()
      })

    },
    handlehCangeUpload(file,fileList) {
      
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
        console.log(res)
        this.updateFormInfo.userAvater = res.data.imgUrl
        this.$message.success('上传成功')
      })
    }
  },
  computed: {
    //这里需要把store 动态的数据放到computed里面才会同步更新 视图
    userInfo() {
      return this.$store.state.userInfo
    },
    uploadClass(){
      return this.fileList.length==1
    },
  },

};
</script>

<style scoped>
.card {
  height: 600px;
}

.el-table {
  margin: 10px 0;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
::v-deep .disabled .el-upload.el-upload--picture-card {
    display: none !important;
}

::v-deep  .disabled .el-button--success.is-plain {
    display: none !important;
}


</style>