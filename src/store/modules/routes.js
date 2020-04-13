import flake from '../../utils/flake'
import { loadFromStorage, saveToStorage } from '../../utils/storage'

const state = {
  data: loadFromStorage('routes')
}

const getters = {
  getRoutes: state => state.data,
  getFinishedRoutes: state => {
    return state.data.filter(route => route.finished)
  },
  getRoutesByLocation: state => id => {
    return state.data.filter(route => route.location === id)
  },
  getRoutesByTag: state => tag => {
    return state.data.filter(route => route.tags.includes(tag))
  },
  searchRoutes: (state, getters) => query => {
    query = query.toLowerCase()
    return getters.getRoutes.filter(routes => {
      let name = routes.name.toLowerCase()
      let notes = routes.notes.toLowerCase()

      return name.match(query) !== null || notes.match(query) !== null
    })
  },
  getRoute: state => (location, route) => {
    return state.data.find(i => i.location === location && i.id === route)
  },
}

const mutations = {
  ADD_ROUTE(state, data) {
    state.data.push({
      name: data.name,
      id: flake.gen(),
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
    state.data.find(route => route.id === id).finished = !state.data.find(
      route => route.id === id
    ).finished
  },
  ADD_PROGRESSION(state, data) {
    let route = state.data.find(route => route.id === data.id)
    route.progressions.push({
      date: data.date,
      notes: data.notes
    })
  },
  REMOVE_PROGRESSION(state, data) {
    let route = state.data.find(route => route.id === data.route)
    route.progressions.splice(
      route.progressions.findIndex(
        progression => progression.notes === data.notes
      ),
      1
    )
  },
  REMOVE_ROUTE(state, id) {
    state.data.splice(state.data.findIndex(route => route.id === id), 1)
  },
  PURGE_ROUTES(state, id) {
    state.data = state.data.filter(route => route.location !== id)
    saveToStorage('routes', state.data)
  }
}

const actions = {
  addRoute({ commit, state }, entryData) {
    commit('ADD_ROUTE', entryData)
    saveToStorage('routes', state.data)
  },
  switchFinishedRoute({ commit, state }, route) {
    commit('SWITCH_FINISHED', route)
    saveToStorage('routes', state.data)
  },
  addProgression({ commit, state }, entryData) {
    commit('ADD_PROGRESSION', entryData)
    saveToStorage('routes', state.data)
  },
  removeProgression({ commit, state }, entryData) {
    commit('REMOVE_PROGRESSION', entryData)
    saveToStorage('routes', state.data)
  },
  deleteRoute({ commit, state }, id) {
    commit('REMOVE_ROUTE', id)
    saveToStorage('routes', state.data)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
