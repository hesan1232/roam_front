<template>
  <div class="main_footer">
        <div class="main_footer_content main_center">
          <div class="footer_info">
            <dl class="footer_info_intro footer_info_left">
              <dt>河南城建学院漫游指南</dt>
              <dd>城建学子用得更多的漫游网站</dd>
            </dl>
            <dl class="footer_info_about footer_info_left">
              <dd>
                <a href="#">关于城建</a>
              </dd>
              <dd>
                <a href="#">联系我们</a>
              </dd>
              
            </dl>
            <dl class="footer_info_about footer_info_left">
              
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
  clear: both;
  background-color: #04305c;
  color: #c2c2c2;
  line-height: 22px;
  font-size: 12px;
  width: 100%;
  padding: 10px;
  position: absolute;
  left: 0;
  bottom: 0;
}

.main_footer_content {
  width: 1000px;
  height: 80px;

  display: block;
  overflow: hidden;
}

.footer_info {
  padding: 10px 8px;
  overflow: hidden;
}

.footer_info dt {
  height: 20px;
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

</style>