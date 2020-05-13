import flake from '@/utils/flake'
import { today } from '@/utils/dates'
import { loadFromStorage, saveToStorage } from '@/utils/storage'

const state = loadFromStorage('routes')

const getters = {
  getFinishedRoutes: state => {
    return state.filter(route => route.finished)
  },
  getUpcomingRoutes: state => {
    return state.filter(route => {
      let date = new Date(today)
      date.setDate(date.getDate() + 16)
      return route.goal !== false && new Date(route.goal) < date
    })
  },
  getRoutesByLocation: state => id => {
    return state.filter(route => route.location === id)
  },
  getRoutesByTag: state => tag => {
    return state.filter(route => route.tags.includes(tag))
  },
  searchRoutes: (state) => query => {
    query = query.toLowerCase()
    return state.filter(route => {
      let name = route.name === undefined ? '' : route.name.toLowerCase()
      let notes = route.notes === undefined ? '' : route.notes.toLowerCase()

      return name.match(query) !== null || notes.match(query) !== null
    })
  },
  getRoute: state => (location, route) => {
    return state.find(i => i.location === location && i.id === route)
  }
}

const mutations = {
  ADD_ROUTE(state, { data, id }) {
    state.push({
      name: data.name,
      id,
      location: data.location,
      grade: data.grade,
      length: data.length,
      color: data.color,
      notes: data.notes,
      photos: [],
      tags: data.tags,
      goal: data.goal,
      finished: false,
      progressions: []
    })
  },
  SWITCH_FINISHED(state, id) {
    let route = state.find(route => route.id === id)
    route.finished = !route.finished
  },
  ADD_PROGRESSION(state, data) {
    let route = state.find(route => route.id === data.id)
    route.progressions.push({
      id: flake.gen(),
      date: data.date,
      notes: data.notes
    })
  },
  REMOVE_PROGRESSION(state, data) {
    let route = state.find(route => route.id === data.route)
    let progressionIndex = route.progressions.findIndex(progression => progression.id === data.progression)
    route.progressions.splice(progressionIndex, 1)
  },
  UPDATE_ROUTE(state, data) {
    let route = state.find(route => route.id === data.id)
    route.name = data.name
    route.grade = data.grade
    route.length = data.length
    route.color = data.color
    route.notes = data.notes
    route.tags = data.tags
    route.photos = data.photos

    route.goal = data.enableGoal ? data.goal : false
  },
  TRANSFER_ROUTE(state, data) {
    let route = state.find(route => route.id === data.route)
    route.location = data.location
  },
  PURGE_ROUTES_ASSET(state, id) {
    state.forEach((route) => {
      route.photos = route.photos.filter(photo => photo !== id)
    })
    saveToStorage('routes', state)
  },
  REMOVE_ROUTE(state, id) {
    let indexToRemove = state.findIndex(route => route.id === id)
    state.splice(indexToRemove, 1)
  },
  PURGE_ROUTES(state, id) {
    state = state.filter(route => route.location !== id)
    saveToStorage('routes', state)
  }
}

const actions = {
  addRoute({ commit, state }, data) {
    let id = flake.gen()

    commit('ADD_ROUTE', { data, id })
    saveToStorage('routes', state)

    return id
  },
  switchFinishedRoute({ commit, state }, route) {
    commit('SWITCH_FINISHED', route)
    saveToStorage('routes', state)
  },
  addProgression({ commit, state }, entryData) {
    commit('ADD_PROGRESSION', entryData)
    saveToStorage('routes', state)
  },
  removeProgression({ commit, state }, entryData) {
    commit('REMOVE_PROGRESSION', entryData)
    saveToStorage('routes', state)
  },
  updateRoute({ commit, state }, data) {
    commit('UPDATE_ROUTE', data)
    saveToStorage('routes', state)
  },
  transferRoute({ commit, state }, data) {
    commit('TRANSFER_ROUTE', data)
    saveToStorage('routes', state)
    data.$router.push({
      name: 'route',
      params: {
        location: data.location,
        route: data.route
      }
    })
  },
  removeRoute({ commit, state }, id) {
    commit('REMOVE_ROUTE', id)
    saveToStorage('routes', state)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
