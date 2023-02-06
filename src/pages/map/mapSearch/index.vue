<template>
  <div>
    <div class="search_top">
      <el-input class="inline-input" v-model="searchText" placeholder="请输入地点名称" clearable
        style="width: 320px;"></el-input>
      <el-button type="primary" @click="searchPlaceInfo">搜索</el-button>
    </div>
    <el-tabs v-model="activePane" type="border-card" @tab-click="handleClick" class="tab">
      <el-tab-pane label="详细信息" name="searchData" class="tab_pane">
        <template>
          <el-descriptions title="地点信息" size="mini" :column="1">
            <template slot="extra">
              <el-button class="el-icon-close" circle @click="tabChange('searchHost')"></el-button>
            </template>
            <el-descriptions-item label="地点名">{{ placeInfo.placeName }}</el-descriptions-item>
            <el-descriptions-item label="类型" :span="2">
              <el-tag size="small">{{ placeInfo.placeType }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="预览">
              <el-image style="width: 300px; height: 200px" :src="placeInfo.ImgUrl"
                :preview-src-list="[placeInfo.ImgUrl]">
                <div slot="placeholder" class="image-slot">
                  加载中<span class="dot">...</span>
                </div>
              </el-image>
            </el-descriptions-item>
            <el-descriptions-item label="描述信息" :span="1">{{ placeInfo.description }}</el-descriptions-item>
          </el-descriptions>
        </template>
      </el-tab-pane>
      <el-tab-pane label="搜索结果" name="searchResult" class="tab_pane searchResult">
        <template>
          <ul>
            <li v-for="item in searchPlaceList" :key="item.id" @click="clickPlaceResult(item)">
              <i><img class="sr_icon" src="@/assets/icon/mark.png"></i>

              <span>{{ item.placeName }}</span>

              <i class="el-icon-position iRight"></i>
            </li>
          </ul>
        </template></el-tab-pane>
      <el-tab-pane label="地点分类" name="searchHost" class="tab_pane typePane">
        <ul class="type">
          <li class="type_item">
            <img src="@/assets/icon/book.png" alt="">
            <p>学院专业</p>
          </li>
          <li class="type_item">
            <img src="@/assets/icon/home.png" alt="">
            <p>校园教学</p>
          </li>
          <li class="type_item">
            <img src="@/assets/icon/school.png" alt="">
            <p>校园宿舍</p>
          </li>
          <li class="type_item">
            <img src="@/assets/icon/bowl.png" alt="">
            <p>校园美食</p>
          </li>
        </ul>
        <div>
          <h3 class="type_title">分类</h3>
          <ul class="type">
            <li class="type_item" v-for="item in placeTypeList" :key="item.id" @click="clickPlaceType(item.placeType)">
              <img :src="require('@/assets/icon/' + `${item.url}.png`)" alt="">
              <p>{{ item.placeType }}</p>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="type_title">推荐</h3>
          <ul class="type">
            <li class="type_item">
              <a href="https://720yun.com/t/d3vkb917r1m?scene_id=89960801" target="_blank">
                <img src="@/assets/icon/vr.png" alt="">
                <p>全景漫游</p>
              </a>
            </li>
            <li class="type_item">
              <img src="@/assets/icon/fire.png" alt="">
              <p>热门搜索</p>
            </li>

          </ul>
        </div>
        <div>
          <h3 class="type_title">新生服务</h3>
          <ul class="type" style="border: none;">

            <li class="type_item" @click="imgDlg = true">
              <img src="@/assets/icon/fire.png" alt="">
              <p>移动服务</p>
            </li>

          </ul>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="全景漫游" :visible.sync="imgDlg" width="60%"  >
      <div style="text-align: center;">
        <p>手机微信扫一扫</p>
      <img src="@/assets/out.jpg" alt="">
      <p>沉浸式全景体验</p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  reqGetPlaceByPlaceName,
  reqGetPlaceTypeList, reqGetPlaceListByPlaceType
} from "@/api/place";
export default {
  data() {
    return {

      //tab栏
      activePane: "searchHost",
      //收集表单数据
      searchText: "",
      //检索的信息
      placeInfo: {
        placeName: '十号楼',
        placeType: '教学楼',
        description: '这是简单描述',
        ImgUrl: ''

      },
      //搜索结果数组
      searchPlaceList: {},
      placeTypeList: {
        id: 1,
        typeName: '教学楼',
        url: '@/assets/icon/mark.png',

      },
      //图片弹窗
      imgDlg: false,
    };
  },
  created() {
    this.getPlaceTypeList()
  },

  methods: {
    //根据名字模糊搜索
    getPlaceByPlaceName(searchText) {
      reqGetPlaceByPlaceName(searchText).then(
        (res) => {
          this.searchPlaceList = res.data
          this.activePane = "searchResult"
        },
        (err) => {
          console.log(err);
        }
      );
    },
    //获取分类列表
    getPlaceTypeList() {
      reqGetPlaceTypeList().then(res => {
        this.placeTypeList = res.data

      })
    },
    //根据分类查找地点列表
    getPlaceListByPlaceType(placeType) {
      reqGetPlaceListByPlaceType({ placeType }).then(res => {
        this.searchPlaceList = res.data
      })
    },
    //搜索结果点击
    clickPlaceResult(data) {
      this.$emit('updateMapPlaceInfo', {
        mapCenter: [data.placeX, data.placeY],
        Link: data.Link,
        iframeInfoWindow: true,
        mapZoom: 20,
      })
      this.activePane = "searchData"
      this.placeInfo = data
    },
    //地点结果点击
    clickPlaceType(placeType) {
      this.getPlaceListByPlaceType(placeType)
      this.activePane = "searchResult"
    },

    //向后端请求具体地点信息
    searchPlaceInfo() {
      this.getPlaceByPlaceName(this.searchText);
    },
    //tab栏切回调
    handleClick(tab, event) {
      console.log('切换');
    },
    tabChange(name) {
      this.activePane = name
    }

  },
  computed: {
    //判断dataInfo是否为空，控制详情显示
    show() {
      console.log(
        Object.keys(this.dataInfo).length == 1,
        Object.keys(this.dataInfo)
      );
      return Object.keys(this.dataInfo).length != 0;
    },
  },

};
</script>

<style scoped>
.el-descriptions-item__content {
  width: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.search_top {
  position: absolute;
  width: 390px;
  top: 18px;
  left: 16px;
  z-index: 10;
  box-sizing: border-box;
}

.tab {
  position: absolute;
  width: 390px;
  top: 75px;
  left: 16px;
  z-index: 10;
  background-color: white;
  overflow: hidden;
  box-sizing: border-box;
}

::v-deep .el-tabs__nav {
  width: 100%;
  overflow: hidden;
}

::v-deep .el-tabs__item {
  width: 34%;
  text-align: center;
}

::v-deep .el-tabs__content {
  padding: 0 !important;
}

.tab_pane {
  height: 400px;
  overflow: auto;
  padding: 15px;
}

.typePane {
  padding: 0;
  padding-top: 15px;
  padding-left: 15px;
}

.type {
  width: 100%;
  border-bottom: 1px solid #dcdfe6;
}

.type_item {
  width: 25%;
  padding: 5px 0px;
  height: 60px;
  text-align: center;
  display: inline-block;
  cursor: pointer;
}

.type_item img {
  height: 26px;
  line-height: 30px;
}

.type_item p {
  font-size: 14px;
}

.type_title {
  font-size: 14px;
  height: 50px;
  line-height: 50px;
}

.searchResult ul {
  cursor: pointer;
}

.searchResult {
  padding: 0 10px;
}

.searchResult li {
  background-color: rgb(240, 244, 247);

  height: 40px;
  line-height: 40px;
  margin-top: 10px;
  border-radius: 5px;
  box-shadow: 0 0 3px 0;
  border-bottom: 1px solid rgb(207, 203, 203);
}

.searchResult li:hover {
  background-color: rgb(221, 224, 226);
}

.sr_icon {
  line-height: 40px;
}

#qizi,
.iRight {
  float: right;
  height: 40px;
  line-height: 40px;
  margin-right: 20px;
}

.searchResult .sr_icon {
  padding: 0 10px;
  width: 20px;
  vertical-align: middle;
}

[v-cloak] {
  display: none;
}
</style>