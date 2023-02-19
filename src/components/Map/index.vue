<template>
  <div class="main">
    <mapHead/>
    <div class="map">
     
     <mapSearch @updateMapPlaceInfo="updateMapPlaceInfo"/>
      <MapMain :placeList="placeList" :mapPlaceInfo="mapPlaceInfo" @updateMapPlaceInfo="updateMapPlaceInfo" />
    </div>
  </div>
</template>

<script>
import '@/api/iconfont'
//引入请求

import {
  reqGetAllPlace,} from "@/api/place";
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
      //评论定时器
      notifyTimer:{},
    };
  },
  mounted() {
    this.getPlaceList();
    this.getInteractList()
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
        this.notifyTimer=setInterval(()=>{
          if(i==j) i=0
        this.$notify({
          title: `${ this.interactList[i].nickName}`,
          duration:1000,
          dangerouslyUseHTMLString: true,
          message: `${ this.interactList[i].comments}`,
          position:'bottom-right',
          offset:100,
          customClass:' notification'
        });
        i++
      },
      800)
      })
    },
    //增加评价信息
    addInteract(){
      reqAddInteract().then((result)=>{

      })
    },

  
    //修改标记点和嵌入网页的数据
    updateMapPlaceInfo(data){
     console.log('修改了值',data)
     this.mapPlaceInfo=Object.assign(this.mapPlaceInfo,data)
    },
  },
  beforeDestroy(){
    clearInterval(this.notifyTimer)
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