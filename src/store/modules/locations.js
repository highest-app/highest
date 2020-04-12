import flake from '../../utils/flake'
import { loadFromStorage, saveToStorage } from '../../utils/storage'

const state = {
  data: loadFromStorage('locations')
}

const getters = {
  getLocations: state => state.data,
  getLocationById: state => id => {
    return state.data.find(location => location.id === id)
  },
  searchLocations: (state, getters) => query => {
    query = query.toLowerCase()
    return getters.getLocations.filter(location => {
      let name = location.name.toLowerCase()
      let notes = location.notes.toLowerCase()

      return name.match(query) !== null || notes.match(query) !== null
    })
  }
}

const mutations = {
  ADD_LOCATIONS(state, data) {
    state.data = [...state.data, ...data]
  },
  ADD_LOCATION(state, data) {
    state.data.push({
      name: data.name,
      address: data.address,
      id: flake.gen(),
      notes: data.notes,
      photos: [data.picture]
    })
  },
  DELETE_LOCATION(state, id) {
    state.data.splice(state.data.findIndex(location => location.id === id), 1)
  }
}

const actions = {
  addLocations({ commit, state }, data) {
    commit('ADD_LOCATIONS', data)
    saveToStorage('locations', state.data)
  },
  addLocation({ commit, state }, entryData) {
    commit('ADD_LOCATION', entryData)
    saveToStorage('locations', state.data)
  },
  deleteLocation({ commit, state }, id) {
    commit('DELETE_LOCATION', id)
    commit('PURGE_ROUTES', id)
    saveToStorage('locations', state.data)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
