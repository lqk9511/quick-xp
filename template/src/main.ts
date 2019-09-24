import Vue from 'vue'
import App from './App.vue'
import router from './router'
import xp from '@heibanfe/xp-sdk'
import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'

Vue.config.productionTip = false
const env = process.env.NODE_ENV === 'development'

xp.config({
  baseURL: `${env ? '' : process.env.VUE_APP_API_DOMAIN}/api`,
  storageKey: process.env.VUE_APP_APP_ID,
  isDevelopment: env,
  router
}).then(() => {
  new Vue({
    router,
    created() {
      if (!env) {
        xp.getAppInfo().then(({ environment: appEnv }) => {
          const isUat = !appEnv || appEnv === 'unknow' || appEnv === 'debug' || appEnv === 'development'
          const dsn = isUat ? 'https://4801b1499eb04846915dc3adae986021@sentry.xiaoheiban.cn/5' : 'https://46b5c12b52084c71a5930c6fb2d1fdd6@sentry.xiaoheiban.cn/8'

          Sentry.init({
            dsn,
            environment: process.env.VUE_APP_APP_ID,
            integrations: [new Integrations.Vue({ Vue, attachProps: true })],
            release: process.env.VUE_APP_APP_ID
          })
        })
      }
    },
    render: h => h(App)
  }).$mount('#app')
})
