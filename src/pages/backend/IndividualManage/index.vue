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
        <el-form-item label="头像地址" prop="userAvater">
          <el-input v-model="updateFormInfo.userAvater"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateForm('ruleForm')">确 定</el-button>
      </div>
      <el-upload class="upload-demo" list-type="picture-card" action="#" :http-request="uploadAvater"
        :on-change="handlehCangeUpload" :limit="1">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em></em></div>
        <div class="el-upload__tip" slot="tip">一次只能上传一张jpg、jpeg、png格式的图片</div>
      </el-upload>
    </el-dialog>
    <el-dialog :visible.sync="dialogImage">
      <img width="50%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </el-card>
</template>

<script>
import { reqUpdateUserInfo } from "@/api/user";
import { reqUpLoadImage } from "@/api/upLoad"
import lodash from 'lodash'
export default {
  // props: ['userInfo'],
  data() {
    return {
      // userInfo:this.$store.state.userInfo,
      //表单数据
      dialogVisible: false,
      updateFormInfo: {},
      //表单校验规则
      rules: {
        userAvater: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ],
      },
      //文件
      dialogImageUrl: '',
      dialogImage: false,
    };
  },
  methods: {
    editUserData() {
      this.updateFormInfo = lodash.cloneDeep(this.userInfo)
      this.dialogVisible = true
    },
    //更新用户信息
    updateUserInfo() {
      reqUpdateUserInfo(this.updateFormInfo).then(() => {
        this.$store.dispatch('getUserInfo')
        this.$emit('reqGetUserInfo')
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
      this.dialogType = 1
      this.$nextTick(() => {
        this.$refs[formName].clearValidate()
      })

    },
    handlehCangeUpload(file) {
      let formData = new FormData();
      console.log(file, "参数")
      formData.append('file', file.raw);//键名要和后台一致
      this.upLoadImage(formData)
    },
    uploadAvater(file,) {
      // console.log(file,"覆盖上传事件")

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
    }
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
</style>