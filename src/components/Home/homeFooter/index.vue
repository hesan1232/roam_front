<template>
  <div class="main_footer">
        <div class="main_footer_content main_center">
          <div class="footer_info">
            <dl class="footer_info_intro footer_info_left">
              <dt>河南城建学院漫游指南</dt>
              <dd>城建学子用得更多的漫游网站</dd>
              <dd>上亿旅行者共同打造的<strong>"旅行神器"</strong></dd>
              <dd> 多个<strong>"食堂自习室"</strong>目的地</dd>
             
            </dl>
            <dl class="footer_info_about footer_info_left">
              <dt>关于我们</dt>
              <dd>
                <a href="#">关于马蜂窝</a>
              </dd>
              <dd>
                <a href="#">联系我们</a>
              </dd>
              <dd>
                <a href="#">隐私政策</a>
              </dd>
              <dd>
                <a href="#">服务协议</a>
              </dd>
            </dl>
            <dl class="footer_info_about footer_info_left">
              <dt>关于我们</dt>
              <dd>
                <a href="#">关于马蜂窝</a>
              </dd>
              <dd>
                <a href="#">联系我们</a>
              </dd>
              <dd>
                <a href="#">隐私政策</a>
              </dd>
              <dd>
                <a href="#">服务协议</a>
              </dd>
            </dl>
          </div>
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
/* 底部区域 */
.main_footer {
  height: 300px;
  background-color: rgb(136, 135, 135);
  clear: both;
  background-color: #3c3c3c;
  color: #c2c2c2;
  line-height: 22px;
  padding-bottom: 20px;
  font-size: 12px;
}

.main_footer_content {
  width: 1000px;
  height: 300px;

  display: block;
  overflow: hidden;
}

.footer_info {
  padding: 30px 8px 40px 8px;
  border-bottom: 1px solid #575a5b;
  overflow: hidden;
}

.footer_info dt {
  height: 30px;
  font-size: 14px;
  overflow: hidden;
}

.footer_info_intro {
  width: 200px;
  margin-right: 200px;
}

.footer_info_about {
  width: 128px;
  margin-right: 150px;
}

.footer_info_about a {
  color: #c2c2c2;
  list-style: none;
}

.footer_info_code {
  float: right;
  padding-top: 22px;
  line-height: 1.4em;
}

.footer_info_left {
  float: left;
}

.footer_info_intro strong {
  color: #ff9d00;
  font-weight: normal;
}
</style>