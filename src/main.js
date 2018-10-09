import Vue from 'vue'
import './components/base'
import App from './App'
import store from './vuex'
import router from './router'

import './utils/directives'
import './assets/scss/app.scss'
import './registerServiceWorker'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
