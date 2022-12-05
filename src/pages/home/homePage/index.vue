<template>
  <div>
    <div class="main_carousel main_center">
      <el-carousel height="600px">
        <el-carousel-item v-for="(item, index) in imageList" :key="index">
          <img class="carousel-img" :src="item.url" alt="">
          <h3 class="small">{{ item.url }}</h3>
        </el-carousel-item>
      </el-carousel>
      <div class="carousel_right_black">
        <el-input v-model="searchData.text" placeholder="请输入">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </div>
    <div class="main_content main_center">
      <div class="content_total">
        <h3>地点分类</h3>
      </div>
      <div class="content_main">
        <div v-for="item in classiFyList" :key="item.name" class="content_entrys classify_item">
          <img class="classify_img" :src="item.url" alt="">
          <p>{{item.name}}</p>
        </div>
        
      </div>

    </div>
    <div class="main_content main_center">
      <div class="recommend_total">
        <h3>每日推荐</h3>
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
          url: require('@/assets/images/home1.png')
        }, {
          url: require('@/assets/images/home2.png')
        }, {
          url: require('@/assets/images/home3.png')
        },],
      classiFyList: [
        {
          name:'教学楼',
          url: require('@/assets/images/classify/edu.png')
        }, {
          name:'运动场',
          url: require('@/assets/images/classify/playground.png')
        }, {
          name:'自习室',
          url: require('@/assets/images/classify/studyRoom.png')
        },
        {
          name:'食堂',
          url: require('@/assets/images/classify/eatRoom.png')
        }, {
          name:'办公室',
          url: require('@/assets/images/classify/office.png')
        },
        {
          name:'服务楼',
          url: require('@/assets/images/classify/serviceRoom.png')
        },],
      searchData: {
        text: ''
      },
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
  height: 600px;
}

.carousel_right_black {
  width: 500px;
  height: 45px;
  position: absolute;
  top: 60%;
  right: 50%;
  transform: translate3d(50%, 50%, 0);
  padding: 0 20px;
  z-index: 10;
  line-height: 45px;
  border-radius: 30px;
  background-color: #3c3c3c76;
}

.carousel-img {
  width: 100%;
  height: 100%;
}

/* 输入框颜色 */



/* 内容区域 */
.main_content {
  width: 1000px;
  margin-top: 10px;
  margin-bottom: 10px;
  overflow: hidden;

}

.content_total {
  font-size: 14px;
}

.content_main {
  display: flex;
  justify-content: space-between;
}

/* 分类 */
.classify_item {
  position: relative;
  width: 150px;
  height: 60px;
}

.classify_img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  float: left;
}

.classify_item p {
  z-index: 10;
}

.content_entrys {
  margin-right: 0;
  display: inline-block;
  background-color: white;
  background-repeat: no-repeat;
  text-align: center;
}

.content_entrys p {
  color: #fff;
  position: absolute;
  top: 20px;
  right: 0;
}
.recommend_total{
  font-size: 14px;
}
.content_recommend {
  width: 315px;
  height: 300px;
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