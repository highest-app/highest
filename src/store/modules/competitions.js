import flake from '../../utils/flake'
import { loadFromStorage, saveToStorage } from '../../utils/storage'

const state = {
  data: loadFromStorage('competitions')
}

const getters = {
  getCompetitions: state => state.data,
  getCompetitionById: state => id => {
    return state.data.find(competition => competition.id === id)
  }
}

const mutations = {
  ADD_COMPETITION (state, data) {
    state.data.push({
      id: flake.gen(),
      name: data.name,
      description: data.description,
      location: data.location,
      date: data.date,
      participation: data.participation,
      website: data.website
    })
  }
}

const actions = {
  addCompetition ({ commit, state }, entryData) {
    commit('ADD_COMPETITION', entryData)
    saveToStorage('competitions', state.data)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
