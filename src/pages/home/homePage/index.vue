<template>
  <div>
    <div class="main_carousel main_center">
      <el-carousel height="500px">
        <el-carousel-item v-for="(item, index) in imageList" :key="index">
          <img class="carousel-img" :src="item.url" alt="">
          <h3 class="small">{{ item.url }}</h3>
        </el-carousel-item>
      </el-carousel>
      <div class="carousel_right_black">wdewr</div>
    </div>
    <el-card class="main_content main_center">
      <div style="margin-left: 10px;">
        <h2>地点分类</h2>
      </div>
      <div class="content_entrys">
      </div>
      <div class="content_entrys">
      </div>
      <div class="content_entrys">
      </div>
      <div class="content_entrys">
      </div>
      <div class="content_entrys">

      </div>
      <div class="content_entrys">

      </div>
    </el-card>
    <div class="main_content main_center">
      <div style="margin-left: 10px;">
        <h2>地点推荐</h2>
      </div>
      <div class="content_recommend">
      </div>
      <div class="content_recommend">
      </div>
      <div class="content_recommend">
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      imageList: [
        {
          url: 'https://cdn.jsdelivr.net/gh/hesan1232/picgoImage/image/home-5.jpg'
        }, {
          url: 'https://cdn.jsdelivr.net/gh/hesan1232/picgoImage/image/home-2.jpg'
        }, {
          url: 'https://cdn.jsdelivr.net/gh/hesan1232/picgoImage/image/home-3.jpg'
        }, {
          url: 'https://cdn.jsdelivr.net/gh/hesan1232/picgoImage/image/home-4.jpg'
        },]
    }
  },
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
.carousel-img{
  width: 100%;
  height: 100%;
}
::v-deep .el-carousel__indicators li {
  box-shadow: none !important;
}

/* 内容区域 */
.main_content {
  width: 1000px;
  margin-bottom: 10px;
  background-color: pink;
  overflow: hidden;
}

.content_entrys {
  width: 130px;
  height: 60px;
  margin: 5px;
  margin-right: 0;
  border: 1px solid #e5e5e5;
  display: inline-block;
  background-color: white;
  background-repeat: no-repeat;
}

.content_recommend {
  width: 315px;
  height: 300px;
  margin: 10px;
  margin-right: 0;
  border: 1px solid #e5e5e5;
  display: inline-block;
  background-color: white;
  background-repeat: no-repeat;
}

.content_essay {
  width: 700px;
  height: 1000px;
  float: left;
  background-color: #99a9bf;
}

.content_aside {
  width: 300px;
  height: 600px;
  float: left;
  background-color: white;
}


</style>