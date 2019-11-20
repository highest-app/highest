import Vue from 'vue'
import Vuex from 'vuex'

import locations from './locations'
import routes from './routes'
import settings from './settings'

Vue.use(Vuex)

const state = {

}

const getters = {

}

const mutations = {

}

const actions = {

}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    locations,
    routes,
    settings
  }
})
