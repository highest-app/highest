import {loadFromStorage, saveToStorage} from '../../utils/storage.js'

const state = {
  data: loadFromStorage('locations')
}

const getters = {
  getLocations: state => state.data,
  getLocationById: state => id => {
    return state.data.filter(location => location.id === id)[0]
  }
}

const mutations = {
  ADD_LOCATION: (state, data) => {
    state.data.push({
      name: data.name,
      id: data.name.toLowerCase().replace(' ', '-'),
      notes: data.notes,
      photos: [data.photo]
    })
  }
}

const actions = {
  addLocation: ({commit, state}, entryData) => {
    commit('ADD_LOCATION', entryData)
    saveToStorage('locations', state.data)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}