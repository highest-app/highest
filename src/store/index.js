import Vue from 'vue'
import Vuex from 'vuex'

import competitions from './modules/competitions'
import locations from './modules/locations'
import routes from './modules/routes'
import settings from './modules/settings'

Vue.use(Vuex)

const state = {}
const getters = {
  getRawData: (_, getters) => {
    return JSON.stringify({
      locations: getters.getLocations,
      routes: getters.getRoutes,
      competitions: getters.getCompetitions,
      settings: getters.getSettings
    })
  }
}
const mutations = {}
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
  state,
  getters,
  mutations,
  actions,
  modules: {
    competitions,
    locations,
    routes,
    settings
  }
})

global.store = store
export default store