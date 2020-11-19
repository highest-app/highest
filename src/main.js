import Vue from 'vue'
import App from '@/App.vue'

// Plugins
import i18n from '@/plugins/i18n'
import router from '@/plugins/router'
import vuetify from '@/plugins/vuetify'
import store from '@/store'
import '@/components'
import '@/registerServiceWorker'

import VueResource from 'vue-resource'
Vue.use(VueResource)

// Mixins
import '@/utils/dates'

// Assets
import '@babel/polyfill'
import '@/css/index.styl'
import '@mdi/font/css/materialdesignicons.css'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'leaflet/dist/leaflet.css'

Vue.config.productionTip = false

let app = new Vue({
  vuetify,
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

export default app
