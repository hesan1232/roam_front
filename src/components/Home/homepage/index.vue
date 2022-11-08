<template>
  <div>
    <div class="main_carousel main_center">
        <el-carousel height="450px">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3 class="small">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
        <div class="carousel_right_black">wdewr</div>
      </div>
      <div class="main_content main_center">
        <div class="content_entrys"></div>
        <div class="content_entrys"></div>
        <div class="content_entrys"></div>
        <div class="content_entrys"></div>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.main_center {
  margin: 0 auto;
}
.main_carousel {
  position: relative;
}
.carousel_right_black {
  width: 110px;
  height: 340px;
  position: absolute;
  top: 40px;
  right: 40px;
  z-index: 10;
  background-color: #3c3c3c;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  line-height: 450px;
  text-align: center;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
::v-deep .el-carousel__indicators li {
  box-shadow:none !important;
}
/* 内容区域 */
.main_content {
  width: 1000px;
  height: 300px;
  background-color: pink;
  overflow: hidden;
}

.content_entrys {
  width: 130px;
  height: 60px;
  margin: 10px;
  margin-right: 0;
  border: 1px solid #e5e5e5;
  display: inline-block;
  background-color: white;
  background-repeat: no-repeat;
}

</style>