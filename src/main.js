import Vue from 'vue'
import App from './App.vue'

import i18n from './plugins/i18n'
import router from './plugins/router'
import vuetify from './plugins/vuetify'
import store from './store'
import './plugins/components'
import './registerServiceWorker'

import VueResource from 'vue-resource'

import '@babel/polyfill'
import '@/css/index.styl'
import '@mdi/font/css/materialdesignicons.css'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'leaflet/dist/leaflet.css'

Vue.config.productionTip = false

Vue.use(VueResource)

new Vue({
  vuetify,
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
