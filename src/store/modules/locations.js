import { loadFromStorage, saveToStorage } from '../../utils/storage.js'

const state = {
  data: loadFromStorage('locations')
}

const getters = {
  getLocations: state => state.data,
  getLocationById: state => id => {
    return state.data.find(location => location.id === id)
  }
}

const mutations = {
  ADD_LOCATION (state, data) {
    state.data.push({
      name: data.name,
      id: data.name.toLowerCase().replace(/ /, '-'),
      notes: data.notes,
      photos: [data.picture]
    })
  },
  DELETE_LOCATION (state, id) {
    state.data.splice(state.data.findIndex(location => location.id === id), 1)
  }
}

const actions = {
  addLocation ({ commit, state }, entryData) {
    commit('ADD_LOCATION', entryData)
    saveToStorage('locations', state.data)
  },
  deleteLocation ({ commit, state }, id) {
    commit('DELETE_LOCATION', id)
    commit('PURGE_ROUTES', id)
    saveToStorage('locations', state.data)
    saveToStorage('routes', state.data)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
