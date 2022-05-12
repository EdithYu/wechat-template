import App from './App'
import store from './store'

import * as config from './api/config'
import * as util from './utils/util.js'
 
const operationalAnalysis = require('./api/operationalAnalysis.js')


// 全局注册腾讯地图组件
const QQMapWX = require('./static/qqmap-wx-jssdk.min')
var qqmapsdk = new QQMapWX({
  key: 'PIHBZ-GJIC6-6G4SP-MKRKT-QSVEH-3FFUN',
})
import {VueJsonp} from 'vue-jsonp'
Vue.use(VueJsonp)
const utils = require('./utils/util')
// import countUp from './components/p-countUp/countUp.vue'
// import xpPicker from './components/xp-picker/xp-picker.vue'

// Vue.component('countup',countUp)
// Vue.component('xppicker',xpPicker)

 // #ifndef VUE3
import Vue from 'vue'
import moment from 'moment'
Vue.filter('DataFormat', function (data, formatType) {
  let formatString = formatType || 'YYYY-MM-DD'
  // 将时间戳转换为时分秒
  if (data) {
    return moment(data).format(formatString)
  }
  return ''
})
// 格式包含昨天今天
Vue.filter('DataTypeFormat', utils.commentTimeHandle)

Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$adpid = '1111111111'
Vue.prototype.$backgroundAudioData = {
  playing: false,
  playTime: 0,
  formatedPlayTime: '00:00:00',
}
App.mpType = 'app'
const god = {}

god.operationalAnalysis = operationalAnalysis


Vue.prototype.$god = god
Vue.prototype.$store = store

Vue.prototype.$map = qqmapsdk //vue实例绑定地图实例
Vue.prototype.$utils = utils

const app = new Vue({
  store,
  ...App,
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'

export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  app.config.globalProperties.$adpid = '1111111111'
  app.config.globalProperties.$backgroundAudioData = {
    playing: false,
    playTime: 0,
    formatedPlayTime: '00:00:00',
  }
  return {
    app,
  }
}
// #endif
