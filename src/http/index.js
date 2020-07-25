import Vue from 'vue'
import VueResource from 'vue-resource'
import services from './services'

Vue.use(VueResource)

const http = Vue.http

http.options.root = 'http://localhost:5000'

// puxa as configuracoes de cada item informado no services
Object.keys(services).map(service => {
  services[service] = Vue.resource('', {}, services[service])
})

const setBearerToken = token => {
  // http.headers.common['Authorization'] = `Bearer  ${token}`
  http.headers.common.authorization = `Bearer  ${token}`
}

export default services

export { http, setBearerToken }
