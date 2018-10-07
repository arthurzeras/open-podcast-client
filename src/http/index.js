import Vue from 'vue'
import VueResource from 'vue-resource'
import modules from './modules'

Vue.use(VueResource)

const http = Vue.http

http.options.root = process.env.VUE_APP_BASE_URL

const services = {}
for (let key in modules) {
  services[key] = Vue.resource('', {}, modules[key])
}

export { http }
export default services
export const setBearerToken = token => {
  http.headers.common['Authorization'] = `Bearer ${token}`
}
