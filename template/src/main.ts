import Vue from 'vue'
import App from './App.vue'
import router from './router'
import xp from '@heibanfe/xp-sdk'
import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'
import sentryConfig from './config/sentry.config'

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
          const isPro = appEnv === 'production'
          const dsn = isPro ? sentryConfig.onlineDSN : sentryConfig.uatDSN
          Sentry.init({
            dsn,
            environment: `${process.env.VUE_APP_APP_ID}_${appEnv}`,
            integrations: [new Integrations.Vue({ Vue, attachProps: true })],
            release: process.env.VUE_APP_APP_ID
          })
        })
      }
    },
    render: h => h(App)
  }).$mount('#app')
})
