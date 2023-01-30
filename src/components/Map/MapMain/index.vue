<template>
  <div class="amap-page-container">
    <el-amap
      ref="map"
      map-style="amap://styles/f1d5cbfe47ddfc9f831d4a923df04a03"
      :opacity="1"
      :center.sync="mapPlaceInfo.mapCenter"
      :zoom="zoom"
      :zooms="[16, 19]"
      view-mode="2D"
      @init="initMap"
      @click="clickMap"
      @moveend="moveendMap"
      class="amap-demo"
    >
      <el-amap-layer-image
        ref="imageLayer"
        @init="initImagLayer"
         :url="url"
        :bounds="bounds"
        :visible="visible"
      >
      </el-amap-layer-image>
      <!-- 地图比例尺 -->
      <el-amap-control-scale :visible="visible" />
      <!-- 地图指南针 -->
      <el-amap-control-control-bar :visible="visible" position="RT" />
      <!-- 地图标记点 -->
      <el-amap-marker
        v-for="marker in placeList"
        :key="marker.id"
        :position="[marker.placeX, marker.placeY]"
        @click="clickArrayMarker(marker)"
      ></el-amap-marker>
      <!-- 地图内嵌全景网站 -->
      <el-amap-info-window
        :position="mapPlaceInfo.mapCenter"
        v-if="mapPlaceInfo.iframeInfoWindow"
        :visible.sync="mapPlaceInfo.iframeInfoWindow"
        @click="openNewLink"
        @close="closeIframeInfoWindow"
      >
        <div
          style="width: 250px; height: 150px; z-index: 10">
          <iframe
            style="width: 100%; height: 100%"
            frameborder="0"
            src="https://720yun.com/t/d3vkb917r1m?scene_id=89960801"
          ></iframe>
        </div>
      </el-amap-info-window>
    </el-amap>
  </div>
</template>

<script>
import mapUrl from '@/assets/map.png';
export default {

  props: [ "placeList", "mapPlaceInfo"],
  
  data() {
    
    return {
      visible: true,
      zoom:16,
    
      url:mapUrl,
      // url: "https://img.zcool.cn/community/01fc3958c9eab4a801219c77058f53.jpg@1280w_1l_2o_100sh.jpg",
      bounds: [113.179513, 33.768828, 113.19891, 33.775999],
    };
  },
  mounted() {},
  methods: {
    clickMap(e) {
      console.log("click map :", e.lnglat.lng,e.lnglat.lat)
      
    },
    initMap(e) {
      console.log('init map: ', e);
    },
    initImagLayer(e) {
      // e._opts.url = this.url;
      // e.Be = this.url;
    },
    //地图有移动
    moveendMap(e){
      console.log(e)
    },
    //点击标记
    clickArrayMarker(marker) {
      this.mapPlaceInfo.mapCenter = [marker.placeX, marker.placeY]
      this.mapPlaceInfo.Link=marker.Link
      this.mapPlaceInfo.iframeInfoWindow = true
      this.mapPlaceInfo.mapZoom = 18
    },
    //打开新网站
    openNewLink() {
      console.log("点击");
     
      setTimeout(()=>{
         if(this.mapPlaceInfo.iframeInfoWindow){
          console.log(this.mapPlaceInfo.Link)
          window.open(this.mapPlaceInfo.Link, "_blank")
         }
      },100)
      
    },
    //关闭信息窗口
    closeIframeInfoWindow(){
      console.log('关闭')
      this.mapPlaceInfo.iframeInfoWindow = false
    }
  },
  watch: {
    mapPlaceInfo:{
      handler(newObj, oldObj) {
        if(oldObj) this.zoom=18
        console.log(oldObj)
      },
      immediate: true,
      deep: true
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
::v-deep .amap-logo{
   display: none;
   opacity:0 !important;
}
::v-deep  .amap-copyright {
   opacity:0;
}
</style>