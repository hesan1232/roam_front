import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false


import store from '@/store'

//引入elm——ui
import ElementUI from 'element-ui';
import '@/assets/element-style/index.css';
Vue.use(ElementUI);
//引入高德地图api

import VueAMap from '@vuemap/vue-amap';
import '@vuemap/vue-amap/dist/style.css'
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '4d2b3c833bb4bebd9726f61801d6fb91',
  securityJsCode:'8e36784df1a2d2c10e295a02875646dd',
});
import VueRout from 'vue-router'
Vue.use(VueRout)

//路由的引入
import router from "@/router";
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
