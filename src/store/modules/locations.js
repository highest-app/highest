import flake from '../../utils/flake'
import { loadFromStorage, saveToStorage } from '@/utils/storage'

const state = loadFromStorage('locations')

const getters = {
  getLocationById: state => id => {
    return state.find(location => location.id === id)
  },
  searchLocations: state => query => {
    query = query.toLowerCase()
    return state.filter(location => {
      let name = location.name.toLowerCase()
      let notes = location.notes.toLowerCase()

      return name.match(query) !== null || notes.match(query) !== null
    })
  }
}

const mutations = {
  ADD_LOCATIONS(state, data) {
    state = [...state, ...data]
  },
  ADD_LOCATION(state, { data, id }) {
    state.push({
      name: data.name,
      address: data.address,
      id,
      notes: data.notes,
      photos: [data.picture]
    })
  },
  DELETE_LOCATION(state, id) {
    let indexToDelete = state.findIndex(location => location.id === id)
    state.splice(indexToDelete, 1)
  }
}

const actions = {
  addLocations({ commit, state }, data) {
    commit('ADD_LOCATIONS', data)
    saveToStorage('locations', state)
  },
  addLocation({ commit, state }, data) {
    let id = flake.gen()

    commit('ADD_LOCATION', { data, id })
    saveToStorage('locations', state)

    return id
  },
  deleteLocation({ commit, state }, id) {
    commit('DELETE_LOCATION', id)
    commit('PURGE_ROUTES', id)
    saveToStorage('locations', state)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
