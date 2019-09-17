import Vue from 'vue'
import App from './App.vue'
import router from './router'
import xp from '@heibanfe/xp-sdk'

Vue.config.productionTip = false
//
const env = process.env.NODE_ENV === 'development'
xp.config({
  baseURL: '/api',
  storageKey: process.env.VUE_APP_APP_ID,
  isDevelopment: env,
  router
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
