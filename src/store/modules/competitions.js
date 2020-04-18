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
  ADD_COMPETITION(state, { data, id }) {
    state.push({
      id,
      name: data.name,
      description: data.description,
      location: data.location,
      date: data.date,
      participation: data.participation,
      website: data.website
    })
  },
  UPDATE_COMPETITION(state, data) {
    let competition = state.find(competition => competition.id === data.id)
    competition.name = data.name
    competition.description = data.description
    competition.date = data.date
    competition.website = data.website
  },
  SET_COMPETITION_PARTICIPATION(state, data) {
    let competition = state.find(competition => competition.id === data.id)
    competition.participation = data.participation
  },
  EXTRACT_COMPETITIONS(state, location) {
    let competitions = state.filter(competition => competition.location.type === 'location' && competition.location.locationID === location.id)
    competitions.forEach(competition => {
      competition.location = {
        type: 'string',
        address: location.address
      }
    })
    saveToStorage('competitions', state)
  }
}

const actions = {
  addCompetition({ commit, state }, data) {
    let id = flake.gen()
    commit('ADD_COMPETITION', { data, id })
    saveToStorage('competitions', state)
    return id
  },
  updateCompetition({ commit, state }, data) {
    commit('UPDATE_COMPETITION', data)
    saveToStorage('competitions', state)
  },
  setCompetitionParticipation({ commit, state }, data) {
    commit('SET_COMPETITION_PARTICIPATION', data)
    saveToStorage('competitions', state)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
