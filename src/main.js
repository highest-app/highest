import Vue from 'vue'
import moment from 'moment'
import App from './App.vue'

import router from './plugins/router'
import vuetify from './plugins/vuetify'
import store from './store'
import './plugins/components'

import '@babel/polyfill'
import '@mdi/font/css/materialdesignicons.css'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@/css/index.styl'

Vue.config.productionTip = false
moment.locale('fr')

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
