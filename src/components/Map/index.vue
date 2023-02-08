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
    };
  },
  mounted() {
    this.getPlaceList();
    // this.getInteractList()
    // this.notice()
   
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
    // clearInterval(notifyTimer)
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

 
.search_top{
  position: absolute;
  width: 390px;
  top: 18px;
  left: 16px;
  z-index: 10;
  box-sizing: border-box;
}
.tab {
  position: absolute;
  width: 390px ;
  top: 75px;
  left: 16px;
  z-index: 10;
  background-color: white;
  overflow: hidden;
  box-sizing: border-box;
}

::v-deep .el-tabs__nav {
  width:100%;
  overflow: hidden;
}

::v-deep .el-tabs__item {   
  width: 34%;
  text-align: center;
}

.tab_pane {
  height: 400px;
  overflow: auto;
}
.type{
  width: 100%;
  border-bottom:1px solid #dcdfe6 ;
}
.type_item{
  width: 25%;
  padding: 5px 0px;
  height: 60px;
  text-align: center;
  display: inline-block;
  cursor: pointer;
}
.type_item img{
  height: 26px;
  line-height: 30px;
}
.type_item p{
  font-size: 14px;
}
.type_title{
  font-size: 14px;
  height: 50px;
  line-height: 50px;
}
.searchResult ul {
  padding: 5px;
  cursor: pointer;
}

.searchResult li {
  background-color: rgb(240, 244, 247);
 
  height: 40px;
  line-height: 40px;
  margin-top: 10px;
  list-style: none;
  border-radius: 10px;
  box-shadow: 0 0 3px 0;
  padding-bottom: 3px;
  border-bottom: 1px solid rgb(207, 203, 203);
}

.searchResult li:hover {
  background-color: rgb(221, 224, 226);
}

#qizi {
  line-height: 40px;
}

.searchResult li #qizi,
.iRight {
  float: right;
  height: 40px;
  line-height: 40px;
  margin-right: 20px;

}

.searchResult #fire {
  padding-left: 5px;
  width: 20px;
}
</style>