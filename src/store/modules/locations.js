import flake from '@/utils/flake'
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
      name: data.name.trim(),
      address: data.address.trim(),
      id,
      notes: data.notes.trim(),
      photos: []
    })
  },
  UPDATE_LOCATION(state, data) {
    let location = state.find(location => location.id === data.id)
    location.name = data.name.trim()
    location.address = data.address.trim()
    location.notes = data.notes.trim()
    location.photos = data.photos
  },
  PURGE_LOCATIONS_ASSET(state, id) {
    state.forEach((location) => {
      location.photos = location.photos.filter(photo => photo !== id)
    })
    saveToStorage('locations', state)
  },
  REMOVE_LOCATION(state, id) {
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
  updateLocation({ commit, state }, data) {
    commit('UPDATE_LOCATION', data)
    saveToStorage('locations', state)
  },
  removeLocation({ commit, state, getters }, id) {
    commit('PURGE_ROUTES', id)
    commit('EXTRACT_COMPETITIONS', getters.getLocationById(id))
    commit('REMOVE_LOCATION', id)
    saveToStorage('locations', state)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
