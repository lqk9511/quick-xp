import Vue from 'vue'
import Home from './Home.vue'

// const HomeConstructor = Vue.extend(Home)

// new HomeConstructor().$mount()

Vue.config.productionTip = false

new Vue({
  render: h => h(Home)
}).$mount('#app')
