<template>
  <div>
    <div class="main_carousel main_center">
      <el-carousel height="500px">
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

      <div class="content_main">
        <div v-for="item in classiFyList" :key="item.name" class="content_entrys classify_item">
          <img class="classify_img" :src="item.url" alt="">
          <p>{{ item.name }}</p>
        </div>

      </div>

    </div>
    <div class="main_content main_center">

      <ul class="content_column">
        <div class="column_head">专栏</div>
        <div class="column_list">
          <h3>河南城建最新资讯</h3>
          <ul>
            <li>10月18日<a href="#">这是一条金报新闻</a></li>
            <li>10月18日<a href="#">这是一条金报新闻</a></li>
            <li>10月18日<a href="#">这是一条金报新闻</a></li>
            <li>10月18日<a href="#">这是一条金报新闻</a></li>
            <li>10月18日<a href="#">这是一条金报新闻</a></li>
          </ul>
        </div>
        <li class="column_aside">
          <div class="aside_hd">
            <h2 class="hd-title"><a href="#">加入我们</a></h2>
            <a href="#" class="hd-right">更多资讯</a>
          </div>
          <div class="aside_bd">
            <img
              src="https://p1-q.mafengwo.net/s12/M00/4C/F0/wKgED1uvSMeAYV_QAAOg0xhjC5U96.jpeg?imageMogr2%2Fthumbnail%2F%21260x139r%2Fgravity%2FCenter%2Fcrop%2F%21260x139%2Fquality%2F100"
              alt="">
            <a href="#">这是对图片的xfsfsssssssd绍</a>
          </div>
        </li>
        <li class="column_aside">
          <div class="aside_hd">
            <h2 class="hd-title"><a href="#">加入我们</a></h2>
            <a href="#" class="hd-right">更多资讯</a>
          </div>
          <div class="aside_bd">
            <img
              src="https://p1-q.mafengwo.net/s12/M00/4C/F0/wKgED1uvSMeAYV_QAAOg0xhjC5U96.jpeg?imageMogr2%2Fthumbnail%2F%21260x139r%2Fgravity%2FCenter%2Fcrop%2F%21260x139%2Fquality%2F100"
              alt="">
            <a href="#">这是对图片的xfsfsssssssd绍</a>
          </div>
        </li>
      </ul>
      <ul class="content_essay">
        <div class="content_essay_head">
          <p class="essay_head_left">热门游记</p>
          <el-button class="essay_head_right" type="primary" icon="el-icon-edit">写游记</el-button>
        </div>
        <li class="essay_item">
          <img
            src="https://note.mafengwo.net/img/37/6e/0db100de8d2faa35c129ee2457ba9a4b.jpeg?imageMogr2%2Fthumbnail%2F%21440x300r%2Fstrip%2Fgravity%2FCenter%2Fcrop%2F%21440x300%2Fquality%2F90"
            alt="">
          <div class="essay_item_info">
            <p class="item_info_total"><a href="">冰岛冬季环岛 | 世界若有尽头，应是一首孤独的蓝色散文诗</a></p>
            <p class="item_info_text"> 关于出发，意料之外却又情理之中 我不知道有多少人，这个春天，跟我一样，被困囿于魔都的封城里。灵魂和身体，总...</p>
            <div class="item_info_extra">

              <span><i class="el-icon-location-outline"></i>图书馆</span>
              <span>爱吃的仙姑噶才</span>
              <span><i class="el-icon-view"></i><a href="">XXX已经阅读</a></span>
            </div>
          </div>
        </li>
        <li class="essay_item">
          <img
            src="https://note.mafengwo.net/img/37/6e/0db100de8d2faa35c129ee2457ba9a4b.jpeg?imageMogr2%2Fthumbnail%2F%21440x300r%2Fstrip%2Fgravity%2FCenter%2Fcrop%2F%21440x300%2Fquality%2F90"
            alt="">
          <div class="essay_item_info">
            <p class="item_info_total"><a href="">冰岛冬季环岛 | 世界若有尽头，应是一首孤独的蓝色散文诗</a></p>
            <p class="item_info_text"> 关于出发，意料之外却又情理之中 我不知道有多少人，这个春天，跟我一样，被困囿于魔都的封城里。灵魂和身体，总...</p>
            <div class="item_info_extra">

              <span><i class="el-icon-location-outline"></i>图书馆</span>
              <span>爱吃的仙姑噶才</span>
              <span><i class="el-icon-view"></i><a href="">XXX已经阅读</a></span>
            </div>
          </div>
        </li>
        <li class="essay_item">
          <img
            src="https://note.mafengwo.net/img/37/6e/0db100de8d2faa35c129ee2457ba9a4b.jpeg?imageMogr2%2Fthumbnail%2F%21440x300r%2Fstrip%2Fgravity%2FCenter%2Fcrop%2F%21440x300%2Fquality%2F90"
            alt="">
          <div class="essay_item_info">
            <p class="item_info_total"><a href="">冰岛冬季环岛 | 世界若有尽头，应是一首孤独的蓝色散文诗</a></p>
            <p class="item_info_text"> 关于出发，意料之外却又情理之中 我不知道有多少人，这个春天，跟我一样，被困囿于魔都的封城里。灵魂和身体，总...</p>
            <div class="item_info_extra">

              <span><i class="el-icon-location-outline"></i>图书馆</span>
              <span>爱吃的仙姑噶才</span>
              <span><i class="el-icon-view"></i><a href="">XXX已经阅读</a></span>
            </div>
          </div>
        </li>
        <li class="essay_item">
          <img
            src="https://note.mafengwo.net/img/37/6e/0db100de8d2faa35c129ee2457ba9a4b.jpeg?imageMogr2%2Fthumbnail%2F%21440x300r%2Fstrip%2Fgravity%2FCenter%2Fcrop%2F%21440x300%2Fquality%2F90"
            alt="">
          <div class="essay_item_info">
            <p class="item_info_total"><a href="">冰岛冬季环岛 | 世界若有尽头，应是一首孤独的蓝色散文诗</a></p>
            <p class="item_info_text"> 关于出发，意料之外却又情理之中 我不知道有多少人，这个春天，跟我一样，被困囿于魔都的封城里。灵魂和身体，总...</p>
            <div class="item_info_extra">

              <span><i class="el-icon-location-outline"></i>图书馆</span>
              <span>爱吃的仙姑噶才</span>
              <span><i class="el-icon-view"></i><a href="">XXX已经阅读</a></span>
            </div>
          </div>
        </li>
      </ul>
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
        }, {
          url: require('@/assets/images/home4.png')
        },],
      classiFyList: [
        {
          name: '教学楼',
          url: require('@/assets/images/classify/edu.png')
        }, {
          name: '运动场',
          url: require('@/assets/images/classify/playground.png')
        }, {
          name: '自习室',
          url: require('@/assets/images/classify/studyRoom.png')
        },
        {
          name: '食堂',
          url: require('@/assets/images/classify/eatRoom.png')
        }, {
          name: '办公室',
          url: require('@/assets/images/classify/office.png')
        },
        {
          name: '服务楼',
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
  height: 500px;
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

/* 内容区域 */
.main_content {
  width: 1000px;
  margin-top: 10px;
  margin-bottom: 10px;

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

.content_column {
  width: 280px;
  display: inline-block;
  vertical-align: top;
}

.column_head {
  width: 100%;
  font-size: 20px;
  height: 20px;
  line-height: 20px;
}

.column_list {
  display: block;
  width: 100%;
  height: 120px;
}

.column_list h3 {
  font-size: 20px;
  font-weight: normal;
  margin: 5px 0;
}

.column_list li {
  font-size: 12px;
}

.column_list li a {
  display: inline-block;
  margin-left: 5px;
}

.column_aside {
  width: 100%;

}

.aside_hd {
  height: 35px;
  line-height: 35px;
}

.hd-title {
  float: left;
  font-size: 18px;
  color: #333;
  font-weight: normal;
}

.hd-right {
  font-size: 10px;
  float: right;
}

.aside_bd {
  width: 100%;
  height: 200px;
}

.aside_bd img {
  width: 100%;
  height: 160px;
}

.aside_bd a {
  display: block;
  width: 100%;
  height: 20px;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap
}

.content_essay {
  width: 680px;
  height: 500px;
  display: inline-block;
  margin-left: 40px;
}

.content_essay_head {
  width: 100%;
  padding: 10px 10px;
  display: flex;
  justify-content: space-between;

}

.essay_head_left {
  width: 150px;
  color: #3a8aff;
  height: 30px;
  margin: 0;
  border-bottom: #3a8aff solid 3px;
}

.essay_head_right {
  width: 150px;
  height: 32px;
  line-height: 5px;
}

.essay_item {
  display: block;
  width: 680px;
  padding: 15px 10px;
  height: 150px;
  background-color: white;
}

.essay_item :hover {
  background-color: #f8f8f8;
}

.essay_item img {
  display: inline-block;
  width: 220px;
  height: 150px;
}

.essay_item_info {
  width: 450px;
  height: 150px;
  padding-left: 10px;
  display: inline-block;
  vertical-align: top;
}

.item_info_total {
  font-size: 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item_info_total a {
  text-decoration: none;
  /* 去除默认的下划线 */
  outline: none;
  /* 去除旧版浏览器的点击后的外虚线框 */
  color: #000;
  /* 去除默认的颜色和点击后变化的颜色 */
}

.item_info_text {
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item_info_extra {
  font-size: 14px;
}

.item_info_extra span {
  display: inline-block;
  color: #999;
  margin-right: 30px;
}
</style>