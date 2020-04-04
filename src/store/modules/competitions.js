import flake from '../../utils/flake'
import { loadFromStorage, saveToStorage } from '../../utils/storage'

const state = {
  data: loadFromStorage('competitions')
}

const getters = {
  getCompetitions: state => state.data,
  getCompetitionById: state => id => {
    return state.data.find(competition => competition.id === id)
  },
  searchCompetitions: (state, getters) => query => {
    query = query.toLowerCase()
    return getters.getCompetitions.filter(competition => {
      let name = competition.name.toLowerCase()
      let description = competition.description.toLowerCase()

      return name.match(query) !== null || description.match(query) !== null
    })
  }
}

const mutations = {
  ADD_COMPETITION(state, data) {
    state.data.push({
      id: flake.gen(),
      name: data.name,
      description: data.description,
      location: data.location,
      date: data.date,
      participation: data.participation,
      website: data.website
    })
  },
  SET_COMPETITION_PARTICIPATION(state, data) {
    state.data.find(competition => competition.id === data.id).participation =
      data.participation
  }
}

const actions = {
  addCompetition({ commit, state }, entryData) {
    commit('ADD_COMPETITION', entryData)
    saveToStorage('competitions', state.data)
  },
  setCompetitionParticipation({ commit, state }, entryData) {
    commit('SET_COMPETITION_PARTICIPATION', entryData)
    saveToStorage('competitions', state.data)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
