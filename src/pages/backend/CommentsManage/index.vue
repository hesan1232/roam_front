<template>
  <el-card class="card">
    <el-button type="primary" @click="dialogVisible = true">新增</el-button>
    <el-table :data="interactList" border style="width: 100%" height="450"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
      <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
      <el-table-column prop="userName" label="用户名"  align="center">
      </el-table-column>

      <el-table-column prop="comments" label="评论信息" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="updateDialog(scope.row)">编辑</el-button>&nbsp;&nbsp;|
          <el-button type="text" @click="deletFormInfo(scope.row)" class="deletecolor">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout=" ->,total, prev, pager, next" :total="total"
      @current-change="handleCurrentChange">
    </el-pagination>
    <el-dialog :title="dialogType == 1 ? '新增' : '编辑'" :visible.sync="dialogVisible" @close="dialogClose('ruleForm')">
      <el-form :model="updateFormInfo" :rules="rules" ref="ruleForm" label-position="left" label-width="120px">
        <el-form-item label="评论信息" prop="comments">
          <el-input v-model="updateFormInfo.comments"></el-input>
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
import { reqGetInteractList, reqAddInteract, 
  reqUpdateInteractById, reqDeleteInteractById } from "@/api/interact"
export default {
  data() {
    return {
      interactList: [],
      total: 0,
      searchInfo: {
        page: 1,
        size: 10,
      },
      dialogType: 1,
      updateFormInfo: {},
      dialogVisible: false,
      //表单校验规则
      rules: {  
        comments: [
          { required: true, message: '请选择活动区域', trigger:['change','blur']  }
        ],
      
      }
    }
  },
  mounted() {
    this.getInteractList();
  },
  methods: {
    //分页获取评论信息
    getInteractList() {
      reqGetInteractList(this.searchInfo).then((res) => {
        this.interactList = res.data.interactList;
        this.total = res.data.total;
      });
    },
    //增加评论
    addInteract() {
      reqAddInteract(this.updateFormInfo).then(res => {
        this.getInteractList()
        this.$message.success('新增成功')
      }, err => { })
    },
    //更新评论
    updateInteractById() {
      reqUpdateInteractById(this.updateFormInfo).then(result => {
        this.getInteractList()
        this.$message.success('更新成功')
      }, err => { })
    },
    //删除地点
    deletFormInfo(data) {
      this.$confirm(`你确定删除 ${data.comments} ?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          reqDeleteInteractById(data.id).then(
            (res) => {
              this.getInteractList();
              this.$message({
                type: "success",
                message: `删除${data.comments}成功`,
              });
            },
            (err) => {
              this.$message({
                type: "error",
                message: `删除${data.placeName}失败`,
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
    // 编辑信息的回调
    updateDialog(data) {
      this.updateFormInfo = data
      this.dialogVisible = true
      this.dialogType = 2
    },
    //更新弹窗确认回调
    updateForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogVisible = false
          this.dialogType == 1 ? this.addInteract() : this.updateInteractById()
        } else {

          return false;
        }
      });
    },
    //分页器的回调
    handleCurrentChange(val) {
      this.searchInfo.page = val;
      this.getInteractList();
    },
    //弹窗关闭的回调
    dialogClose(formName) {
      this.updateFormInfo = {}
      this.dialogType = 1
      this.$nextTick(() => {
        this.$refs[formName].clearValidate()
      })

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
</style>