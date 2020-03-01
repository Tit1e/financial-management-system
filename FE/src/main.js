import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

import dayjs from 'dayjs'
import Notify from '@/utils/notify.js'
import './directive'
import '@/assets/base.scss'

Vue.config.productionTip = false

Vue.prototype.$Notify = Notify
Vue.prototype.$dayjs = dayjs


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
