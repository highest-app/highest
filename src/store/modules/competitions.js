import flake from '@/utils/flake'
import { loadFromStorage, saveToStorage } from '@/utils/storage'

const state = loadFromStorage('competitions')

const getters = {
  getCompetitionById: state => id => {
    return state.find(competition => competition.id === id)
  },
  searchCompetitions: state => query => {
    query = query.toLowerCase()
    return state.filter(competition => {
      let name = competition.name.toLowerCase()
      let description = competition.description.toLowerCase()

      return name.match(query) !== null || description.match(query) !== null
    })
  }
}

const mutations = {
  ADD_COMPETITION(state, data) {
    state.push({
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
    let competition = state.find(competition => competition.id === data.id)
    competition.participation = data.participation
  }
}

const actions = {
  addCompetition({ commit, state }, entryData) {
    commit('ADD_COMPETITION', entryData)
    saveToStorage('competitions', state)
  },
  setCompetitionParticipation({ commit, state }, entryData) {
    commit('SET_COMPETITION_PARTICIPATION', entryData)
    saveToStorage('competitions', state)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
