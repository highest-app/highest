import flake from '@/utils/flake'
import { loadFromStorage, saveToStorage } from '@/utils/storage'
import { today } from '@/utils/dates'

const state = loadFromStorage('competitions')

const getters = {
  getUpcomingCompetitions: state => {
    return state.filter(competition => {
      let date = new Date(today)
      date.setDate(date.getDate() + 31)
      return new Date(competition.date) < date && date < today
    })
  },
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
      name: data.name.trim(),
      description: data.description.trim(),
      location: data.location,
      date: data.date,
      participation: data.participation,
      website: data.website.trim()
    })
  },
  UPDATE_COMPETITION(state, data) {
    let competition = state.find(competition => competition.id === data.id)
    competition.name = data.name.trim()
    competition.description = data.description.trim()
    competition.date = data.date
    competition.website = data.website.trim()
  },
  TRANSFER_COMPETITION(state, data) {
    let competition = state.find(competition => competition.id === data.competition)
    competition.location = {
      type: data.type
    }
    if (data.type === 'location')
      competition.location['locationID'] = data.location
    else
      competition.location['address'] = data.location
  },
  REMOVE_COMPETITION(state, id) {
    let indexToDelete = state.findIndex(competition => competition.id === id)
    state.splice(indexToDelete, 1)
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
  transferCompetition({ commit, state }, data) {
    commit('TRANSFER_COMPETITION', data)
    saveToStorage('routes', state)
  },
  removeCompetition({ commit, state }, id) {
    commit('REMOVE_COMPETITION', id)
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
