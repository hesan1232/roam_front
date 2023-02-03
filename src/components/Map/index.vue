<template>
  <div class="main">
    <mapHead/>
    <div class="map">
      <el-card class="search">
        <el-autocomplete class="inline-input" v-model="searchText" 
          placeholder="请输入地点名称" clearable style="width: 280px"></el-autocomplete>
        <el-button type="primary" @click="searchPlaceInfo">搜索</el-button>
        <el-card style="margin-top: 20px">
          <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
            <el-tab-pane label="详细信息" name="searchData" class="tab_pane">
              <mapSearch v-if="show" :data="dataInfo"></mapSearch>
            </el-tab-pane>
            <el-tab-pane label="搜索结果" name="searchResult" class="tab_pane">
              <template>
                <ul>
                  <li v-for="item in searchPlaceList" :key="item.id" @click="clickPlaceResult(item)">
                    <i class="el-icon-location-information" id="fire"></i>
                    {{ item.placeName }}
                    <i class="el-icon-position iRight"></i>
                  </li>
                </ul>
              </template></el-tab-pane>
            <el-tab-pane label="热门搜索" name="searchHost" class="tab_pane">
              <ul v-for="item in placeTypeList" :key="item.id">
                <li class="grid-content bg-purple" @click="clickPlaceType(item)">
                  <svg class="icon" id="fire" aria-hidden="true">
                    <use xlink:href="#icon-remen"></use>
                  </svg>
                  {{ item.placeType }}
                  <svg class="icon" id="qizi" aria-hidden="true">
                    <use xlink:href="#icon-qizi"></use>
                  </svg>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-card>
      <MapMain :placeList="placeList" :mapPlaceInfo="mapPlaceInfo" @updateMapPlaceInfo="updateMapPlaceInfo" />
    </div>
  </div>
</template>

<script>
import '@/api/iconfont'
//引入请求

import {
  reqGetAllPlace, reqGetPlaceByPlaceName,
  reqGetPlaceTypeList, reqGetPlaceListByPlaceType
} from "@/api/place";
import { reqGetInteractList,reqAddInteract } from '@/api/interact'
import mapHead from "@/pages/map/mapHead"
import MapMain from "@/components/Map/MapMain";
import mapSearch from "@/pages/map/mapSearch"


export default {
  components: { mapHead,MapMain,mapSearch },
  data() {
    return {
      //tab栏
      activeName: "searchHost",
      //收集表单数据
      searchText: "",
      
      //地点数组
      placeList: [],
      //评论数组
      interactList:[],
      //检索地点列表
      searchPlaceList: [],
      //地点类型数组
      placeTypeList: [],

      //后端返回地点列表
      restaurants: [],
      //点击的对象信息
      dataInfo: {},
      //全景内嵌网站的出现控制
      iframeInfoWindow: false,
      //点击结果传递地点信息对象
      mapPlaceInfo: {
        mapCenter: [113.18791, 33.772726],
        Link:'https://720yun.com/t/d3vkb917r1m?scene_id=89960801',
        mapZoom: 18,
        iframeInfoWindow: false,
      },
    };
  },
  mounted() {
    this.getPlaceList();
    // this.getInteractList()
    //初始化分类列表
    this.getPlaceTypeList()
    // this.notice()
    //判断路由是否携带参数
    if(this.$route.query.placeName){
      this.searchText=this.$route.query.placeName
      this.searchPlaceInfo()
    }
  },
  methods: {
   
    //获取地点列表
    getPlaceList() {
      reqGetAllPlace().then((res) => {
        this.placeList = res.data
      });
    },
    //分页获取评论信息
    getInteractList() {
      reqGetInteractList({
        page: 1,
        size: 10,
      }).then((res) => {
        this.interactList = res.data.interactList
        let i=0
        let j=this.interactList.length
        var notifyTimer=setInterval(()=>{
          if(i==j) i=0
        this.$notify({
          title: `${ this.interactList[i].userName}`,
          duration:1000,
          dangerouslyUseHTMLString: true,
          message: `${ this.interactList[i].comments}`,
          position:'bottom-right',
          offset:100
        });
        i++
      },
      800)
        for (let index = 0; index < this.interactList.length; index++) {
         console.log(index)
       
      }
      })
    },
    //增加评价信息
    addInteract(){
      reqAddInteract().then((result)=>{

      })
    },
    //根据名字模糊搜索
    getPlaceByPlaceName(searchText) {
      reqGetPlaceByPlaceName(searchText).then(
        (res) => {
          this.searchPlaceList = res.data
          this.activeName = "searchResult"
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
      this.mapPlaceInfo = { ...this.mapPlaceInfo, ...data }
      this.mapPlaceInfo.mapCenter = [data.placeX, data.placeY]
      this.mapPlaceInfo.iframeInfoWindow = true
      this.mapPlaceInfo.mapZoom = 20
      this.activeName = "searchData"
      this.dataInfo = data
    },
    //地点结果点击
    clickPlaceType(data) {
      this.getPlaceListByPlaceType(data.placeType)
      this.activeName = "searchResult"
    },
    
    //向后端请求具体地点信息
    searchPlaceInfo() {
      this.getPlaceByPlaceName(this.searchText);
    },
    //tab栏切回调
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //评论滚动播放
    notice(){
      let i=0
      let j=this.interactList.length
      console.log(i,j,"----------------")
     
      
      
    },
    //修改标记点和嵌入网页的数据
    updateMapPlaceInfo(data){
     console.log('修改了值',data)
     this.mapPlaceInfo=Object.assign(this.mapPlaceInfo,data)
    },
  },
  beforeDestroy(){
    clearInterval(notifyTimer)
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
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.main {
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
}

.map {
  flex: 1;
  width: 100%;
  position: relative;
  background-color: antiquewhite;
  overflow: hidden;
}

.el-card__body {
  padding: 0 !important;
}

.search {
  position: absolute;
  width: 400px;
  padding: 0;
  top: 20px;
  left: 20px;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0)!important;
  box-shadow: none !important;
  border: none;
}

.el-tabs__nav {
  width: 500px !important;
}

.el-tabs__item {   
  width: 40% !important;
  text-align: center;
}

.tab_pane {
  height: 400px;
  
}

ul {
  padding-left: 20px;
}

li {
  background-color: rgb(240, 244, 247);
  cursor: pointer;
  height: 40px;
  line-height: 40px;
  margin-top: 10px;
  list-style: none;
  border-radius: 10px;
  box-shadow: 0 0 3px 0;
  padding-bottom: 3px;
  border-bottom: 1px solid rgb(207, 203, 203);
}

li:hover {
  background-color: rgb(221, 224, 226);
}

#qizi {
  line-height: 40px;
}

li #qizi,
.iRight {
  float: right;
  height: 40px;
  line-height: 40px;
  margin-right: 20px;

}

#fire {
  padding-left: 5px;
  width: 20px;
}
</style>