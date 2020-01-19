import Vue from 'vue'
import Vuex from 'vuex'

import competitions from './modules/competitions'
import locations from './modules/locations'
import routes from './modules/routes'
import settings from './modules/settings'

Vue.use(Vuex)

const state = {}
const getters = {}
const mutations = {}
const actions = {}

export default new Vuex.Store({
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
