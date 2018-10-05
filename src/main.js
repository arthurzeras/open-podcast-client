import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import directives from './utils/directives'

Vue.config.productionTip = false

new Vue({
  router,
  directives,
  render: h => h(App)
}).$mount('#app')
