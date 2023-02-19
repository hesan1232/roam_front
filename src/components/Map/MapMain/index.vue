<template>
  <div class="amap-page-container">
    <div class="contreole">
      <span class="ct_item">
        <el-checkbox v-model="mapMarkerWindow.iconVisible">地标</el-checkbox>
        </span><span style="color: rgb(207, 203, 203);">|</span>    
      <span class="ct_item">
        <el-checkbox v-model="mapMarkerWindow.textVisible">地名</el-checkbox>
      </span><span style="color: rgb(207, 203, 203);">|</span>
      <span class="ct_item">
        <el-checkbox v-model="commentsVisible">评论</el-checkbox>
        </span><span style="color:rgb(207, 203, 203);">|</span> 
        <span class="ct_item">
        <el-checkbox v-model="mapMarkerWindow.contreoleVisible">工具</el-checkbox>
        </span><span style="color: rgb(207, 203, 203);">|</span>   
      <span class="ct_item">
        <a href="https://720yun.com/t/d3vkb917r1m?scene_id=89960801" target="_blank"> 
          全景漫游
          </a>
          </span>
    </div>
    <div class="addComments" v-if="commentsVisible">
      <el-input v-model="comments" @keyup.enter.native="addInteract" placeholder="输入评论信息"></el-input>
    </div>
    <el-amap id="map" ref="map" map-style="amap://styles/f1d5cbfe47ddfc9f831d4a923df04a03" :opacity="1"
      :center.sync="mapPlaceInfo.mapCenter" :zoom="zoom" :zooms="[17, 20]" view-mode="2D" @init="initMap"
      :jogEnable="false" @click="clickMap" class="amap-demo">

      <el-amap-layer-image ref="imageLayer" :url="url" :bounds="bounds" :visible="visible">
      </el-amap-layer-image>
      <!-- 地图比例尺 -->
      <el-amap-control-scale :visible="visible" />
      <!-- 地图指南针 -->
      <el-amap-control-control-bar :offset="[0, 100]" position="RB" :visible="mapMarkerWindow.contreoleVisible" />
      <!-- 地图缩放控制 -->
      <el-amap-control-tool-bar :offset="[30, 30]" position="RB" :visible="mapMarkerWindow.contreoleVisible"/>
      <!-- 地图标记点 -->
      <el-amap-marker v-for="marker in placeList" :key="marker.id" :position="[marker.placeX, marker.placeY]"  :visible="mapMarkerWindow.iconVisible"
        @click="clickArrayMarker(marker)" />
      <!-- 地点名字标记 -->
      <el-amap-marker v-for="marker in placeList" :key="marker.placeName" :position="[marker.placeX, marker.placeY]"
        :visible="mapMarkerWindow.textVisible" @click="clickArrayMarker(marker)" :offset="[-30, 0]">
        <div class="marker_text" style="">{{ marker.placeName }}</div>
      </el-amap-marker>
      <!-- 地图内嵌全景网站 -->
      <el-amap-info-window :position="mapPlaceInfo.mapCenter" v-if="mapPlaceInfo.iframeInfoWindow"
        :visible.sync="mapPlaceInfo.iframeInfoWindow" @click="openNewLink" @close="closeIframeInfoWindow"
        :offset="[-190, -280]">
        <div style="width: 400px; height: 250px; z-index: 10">
          <iframe id="iframe" ref="iframe" style="width: 100%; height: 100%" frameborder="0"
            :src="mapPlaceInfo.Link"></iframe>
        </div>
      </el-amap-info-window>
    </el-amap>
  </div>
</template>

<script>

import mapUrl from '@/assets/map.png'
import { reqGetInteractList,reqAddInteract } from '@/api/interact'
export default {

  props: ["placeList", "mapPlaceInfo"],

  data() {

    return {
      visible: true,
      zoom: 18,
      url: mapUrl,
      bounds: [113.179513, 33.768828, 113.19891, 33.775999],
      map: null,
      mapMarkerWindow: {
        iconVisible:true,
        textVisible: false,
        contreoleVisible:true,
      },
      commentsVisible:false,
      //评论定时器
      notifyTimer:{},
      //评论内容
      comments:'',

    };
  },
  created() {
    // this.getInteractList()

  },
  beforeDestroy(){
    clearInterval(this.notifyTimer)
  },
  methods: {
    clickMap(e) {
      let text = e.lnglat.lng + '  ' + e.lnglat.lat
      navigator.clipboard.writeText(text)

    },
    initMap(map) {
      //   navigator.geolocation.getCurrentPosition((position) =>{
      //   console.log(position.coords,'0000')

      //     },()=>{},{
      //       enableHighAcuracy :true
      //     }
      //  )
      this.map = map
      console.log('init map: ', this.map);
    },

    //点击标记
    clickArrayMarker(marker) {
      this.$emit('updateMapPlaceInfo', {
        mapCenter: [marker.placeX, marker.placeY],
        Link: marker.Link,
        iframeInfoWindow: true,
        mapZoom: 20,
      })
    },
    //打开新网站
    openNewLink() {
      setTimeout(() => {
        if (this.mapPlaceInfo.iframeInfoWindow) {
          window.open(this.mapPlaceInfo.Link, "_blank")
        }
      }, 100)

    },
    //关闭信息窗口
    closeIframeInfoWindow() {
      const iframe = document.querySelector('#iframe')
      if (iframe) {
        iframe.remove()

      }
      this.$emit('updateMapPlaceInfo', {
        iframeInfoWindow: false,
      })
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
          offset:200,
          customClass:' notification'
        });
        i++
      },
      800)
      })
    },
    //增加评价信息
    addInteract(){
      
      reqAddInteract({comments:this.comments}).then((result)=>{
        this.comments=''
         
      })
    },
  },
  watch: {
    commentsVisible(newItem,oldItem){
      if(newItem) {
        this.getInteractList()
      }else{
        clearInterval(this.notifyTimer)
      }
    }
  }
};

</script>
<style scoped>
.amap-page-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.amap-demo {
  height: 100%;
  margin-bottom: 40px;
}

.amap-info-content {
  padding: 0;
}

::v-deep .amap-logo {
  display: none;
  opacity: 0 !important;
}

::v-deep .amap-copyright {
  opacity: 0;
}

::v-deep .amap-info-content {

  padding: 5px;
}

.marker_text {
  padding: 5px 10px;
  white-space: nowrap;
  background: #ffffff;
  color: #399bff;
  border: 1px solid #399bff;
  border-radius: 10px;
}

/* 控制窗体 */
.contreole {
  position: absolute;
  top: 18px;
  right: 25px;
  z-index: 10;
  font-size: 14px;
  background-color: #ffffff;
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
  border-radius: 2px;
}

.ct_item {
  padding: 5px;
  /* border-right: 1px solid rgb(207, 203, 203); */
  
}
.addComments{
  width: 180px;
  height: 60px;
  position: absolute;
  right: 80px;
  bottom: 10px;
  z-index: 10;
}
</style>