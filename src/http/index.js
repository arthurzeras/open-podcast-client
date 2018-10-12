import Vue from 'vue'
import VueResource from 'vue-resource'
import modules from './modules'
import interceptors from './interceptors'

Vue.use(VueResource)

const http = Vue.http

http.options.root = process.env.VUE_APP_BASE_URL
http.interceptors.push(interceptors)

const services = {}
for (let key in modules) {
  services[key] = Vue.resource('', {}, modules[key])
}

export { http }
export default services
export const setBearerToken = token => {
  http.headers.common['Authorization'] = token
}
