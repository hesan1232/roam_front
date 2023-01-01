<template>
  <el-card class="card">
    <el-button type="primary" @click="dialogVisible = true">新增</el-button>
    <el-table :data="placeList" border style="width: 100%" height="450"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
      <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
      <el-table-column prop="placeName" label="地点名" width="100" align="center">
      </el-table-column>
      <el-table-column prop="placeType" label="类型" width="100" align="center">
      </el-table-column>
      <el-table-column prop="placeX" label="经度" width="100" align="center">
      </el-table-column>
      <el-table-column prop="placeY" label="纬度" width="100" align="center">
      </el-table-column>
      <el-table-column prop="description" label="描述信息" align="center">
      </el-table-column>
      <el-table-column prop="ImgUrl" label="图片地址"> </el-table-column>
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
    <el-dialog :title="dialogType==1?'新增':'编辑'" :visible.sync="dialogVisible" @close="dialogClose('ruleForm')">
      <el-form :model="updateFormInfo" :rules="rules" ref="ruleForm" label-position="left" label-width="120px" >
        <el-form-item label="地点名称" prop="placeName">
          <el-input v-model="updateFormInfo.placeName"></el-input>
        </el-form-item>
        <el-form-item label="地点类型" prop="placeType">
          <el-radio-group v-model="updateFormInfo.placeType">
            <el-radio label="运动场"></el-radio>
            <el-radio label="食堂"></el-radio>
            <el-radio label="自习室"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="地点坐标" prop="placeXY">
          <span style="margin:0 5px;">经度：</span><el-input v-model.number="updateFormInfo.placeX" style="width:250px" placeholder="经度"></el-input>
          <span style="margin:0 5px;">纬度：</span><el-input v-model.number="updateFormInfo.placeY" style="width:250px" placeholder="纬度"></el-input>
        </el-form-item>
        <el-form-item label="全景地址" >
          <el-input v-model="updateFormInfo.Link"></el-input>
        </el-form-item>
        <el-form-item label="图片地址" prop="ImgUrl">
          <el-input v-model="updateFormInfo.ImgUrl"></el-input>
        </el-form-item>
        
        <el-form-item label="地点说明" prop="description">
          <el-input type="textarea" v-model="updateFormInfo.description"></el-input>
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
import {
  reqGetPlaceList, reqUpdatePlaceById,
  reqDeletePlaceById,reqAddPlace
} from "@/api/place";
export default {

  data() {
    return {
      placeList: [],
      total: 0,
      searchInfo: {
        page: 1,
        size: 10,
      },
      dialogType:1,
      updateFormInfo: {},
      dialogVisible: false,
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
    }
  },
  mounted() {
    this.getPlaceList();
  },
  methods: {
    //获取地点列表
    getPlaceList() {
      reqGetPlaceList(this.searchInfo).then((res) => {
        this.placeList = res.data.placeList;
        this.total = res.data.total;
      });
    },
    //增加一个地点
    addPlace() {
      reqAddPlace(this.updateFormInfo).then(res=>{
       this.getPlaceList()
       this.$message.success('新增成功')
      },err=>{})
    },
    //更新地点信息
    updatePlaceById() {
      reqUpdatePlaceById(this.updateFormInfo).then(result => {
        this.getPlaceList()
       this.$message.success('更新成功')
      }, err => { })
    },
    //删除地点
    deletFormInfo(data) {
      this.$confirm(`你确定删除 ${data.placeName} ?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          reqDeletePlaceById(data.id).then(
            (res) => {
              this.getPlaceList();
              this.$message({
                type: "success",
                message: `删除${data.placeName}成功`,
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
      this.dialogType=2
    },
     //更新弹窗确认回调
    updateForm(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogVisible = false
            this.dialogType==1?this.addPlace():this.updatePlaceById()
          } else {
            
            return false;
          }
        });
    },
    //分页器的回调
    handleCurrentChange(val) {
      this.searchInfo.page = val;
      this.getPlaceList();
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

<style scoped>
.card{
  height: 600px;
}
.el-table{
  margin: 10px 0;
}
</style>