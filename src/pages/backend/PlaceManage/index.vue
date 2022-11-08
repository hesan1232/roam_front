<template>
  <el-card class="card">
    <el-button type="primary" @click="addPlace">新增</el-button>
    <el-table
      :data="placeList"
      border
      style="width: 100%"
      height="400"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
    >
      <el-table-column
        type="index"
        label="序号"
        width="60"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="placeName"
        label="用户名"
        width="100"
        align="center"
      >
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
          <el-button type="text" @click="showUpdateForm(scope.row)"
            >编辑</el-button
          >&nbsp;&nbsp;|
          <el-button
            type="text"
            @click="deletFormInfo(scope.row)"
            class="deletecolor"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout=" ->,total, prev, pager, next" :total="total"    @current-change="handleCurrentChange">
    </el-pagination>
  </el-card>
</template>

<script>
import { reqGetPlaceList } from "@/api/place";
export default {
  data() {
    return {
      searchInfo: {
        page: 1,
        size: 10,
      },
      total:0,
      placeList: [],
    };
  },
  mounted() {
    this.getPlaceList()
  },
  methods: {
    //获取地点列表
    getPlaceList() {
      reqGetPlaceList(this.searchInfo).then((res) => {
        console.log(res.data.placeList)
        this.placeList = res.data.placeList
        this.total=res.data.total
      });
    },
    addPlace() {
      console.log("我要新增地点");
    },
    showUpdateForm(data) {
      console.log(data)
    },
    deletFormInfo(data) {
      console.log(data);
    },
    handleCurrentChange(val){
      this.searchInfo.page=val
      this.getPlaceList()
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