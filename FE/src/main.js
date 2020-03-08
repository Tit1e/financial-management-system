import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

import dayjs from 'dayjs'
import Notify from '@/utils/notify.js'
import './directive'
import '@/assets/base.scss'

import ECharts from 'vue-echarts'
// import 'echarts/lib/chart/bar'
// import 'echarts/lib/component/tooltip'

Vue.config.productionTip = false

Vue.prototype.$Notify = Notify
Vue.prototype.$dayjs = dayjs

Vue.component('v-chart', ECharts)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
