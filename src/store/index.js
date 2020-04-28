import Vue from 'vue'
import Vuex from 'vuex'

import actionsModule from '@/store/modules/actions'
import assets from '@/store/modules/assets'
import competitions from '@/store/modules/competitions'
import feeds from '@/store/modules/feeds'
import locations from '@/store/modules/locations'
import routes from '@/store/modules/routes'
import settings from '@/store/modules/settings'
import tags from '@/store/modules/tags'

Vue.use(Vuex)

const state = {
  snackbar: {
    show: false,
    error: false,
    message: '',
    details: ''
  }
}

const getters = {
  getRawData: state => {
    return JSON.stringify({
      actions: state.actions,
      assets: state.assets,
      competitions: state.competitions,
      feeds: state.feeds,
      locations: state.locations,
      routes: state.routes,
      settings: state.settings,
      tags: state.tags
    })
  }
}

const mutations = {
  SHOW_SNACKBAR(state, { message, details, error = false }) {
    state.snackbar.show = true
    state.snackbar.error = error
    state.snackbar.message = message
    state.snackbar.details = details
  }
}

const actions = {
  importData({ store }, data) {
    data = JSON.parse(data)
    store.dispatch('addLocations', data.locations)
    store.dispatch('addRoutes', data.routes)
    store.dispatch('addCompetitions', data.competitions)
    store.dispatch('setSettings', data.settings)
  }
}

let store = new Vuex.Store({
  state, getters, mutations,
  actions,
  modules: {
    actions: actionsModule,
    assets, competitions, feeds, locations, routes, settings, tags
  }
})

export default store
