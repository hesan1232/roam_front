<template>
    <el-descriptions title="地点信息" size="mini" :column="1">
      <el-descriptions-item label="地点名">{{data.placeName}}</el-descriptions-item>
      <el-descriptions-item label="类型" :span="2">
        <el-tag size="small">{{data.placeType}}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="预览" >
        <el-image
          style="width: 300px; height: 200px"
          :src="data.ImgUrl"
          
          :preview-src-list="[data.ImgUrl]"
        >
        <div slot="placeholder" class="image-slot">
        加载中<span class="dot">...</span>
      </div>
        </el-image>
      </el-descriptions-item>
      <el-descriptions-item label="描述信息" :span="1"
        >{{data.description}}</el-descriptions-item
      >
    </el-descriptions>
  </template>
  
  <script>
  export default {
    name:'SearchData',
    props:["data"],
    data() {
      return {
        url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        
      };
    },
  };
  </script>
  
  <style>
  .el-descriptions-item__content{
    width: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .el-image{
    border-radius: 10px;
  }
  </style>