<template>
  <div class="main">
    <mapHead/>
    <div class="map">
     
     <mapSearch @updateMapPlaceInfo="updateMapPlaceInfo" @updateNavPlace="updateNavPlace"/>
      <MapMain :placeList="placeList" :mapPlaceInfo="mapPlaceInfo" :navPlaceInfo="navPlaceInfo" @updateMapPlaceInfo="updateMapPlaceInfo" />
    </div>

  </div>
</template>

<script>
import '@/api/iconfont'
//引入请求
import {reqGetAllPlace,} from "@/api/place";
import { reqGetInteractList,reqAddInteract } from '@/api/interact'
import mapHead from "@/pages/map/mapHead"
import MapMain from "@/components/Map/MapMain";
import mapSearch from "@/pages/map/mapSearch"


export default {
  components: { mapHead,MapMain,mapSearch },
  data() {
    return {
      //全部地点列表
      placeList: [],
      //评论数组
      interactList:[],
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
      //导航地点的信息
      navPlaceInfo:{
        startPlace:null,
        endPlace:null,
      }
    };
  },
  created() {
    this.getPlaceList();
   
  },
  methods: {
   
    //获取地点列表
    getPlaceList() {
      reqGetAllPlace().then((res) => {
        this.placeList = res.data
      });
    },
    //修改标记点和嵌入网页的数据
    updateMapPlaceInfo(data){
     this.mapPlaceInfo=Object.assign(this.mapPlaceInfo,data)
    },
    //修改导航起点和终点
    updateNavPlace(data){
      if(data==null){
      this.navPlaceInfo={startPlace:null,endPlace:null}
       return
     }
     this.navPlaceInfo=Object.assign(this.navPlaceInfo,data)
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
</style>