import { loadFromStorage, saveToStorage } from '../../utils/storage.js'

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
