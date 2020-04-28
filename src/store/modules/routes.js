import flake from '@/utils/flake'
import { loadFromStorage, saveToStorage } from '@/utils/storage'

const state = loadFromStorage('routes')

const getters = {
  getFinishedRoutes: state => {
    return state.filter(route => route.finished)
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
  },
  getRouteById: state => id => {
    return state.find(route => route.id === id)
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
  ADD_PROGRESSION(state, { data, id }) {
    let route = state.find(route => route.id === data.id)
    route.progressions.push({
      id,
      date: data.date,
      notes: data.notes
    })
  },
  REMOVE_PROGRESSION(state, data) {
    let route = state.find(route => route.id === data.route)
    let progressionIndex = route.progressions.findIndex(progression => progression.id === data.progression.id)
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
    route.goal = data.goal
    route.photos = data.photos
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

    commit('PUSH_ACTION', {
      event: 'ROUTE_ADD',
      target: id,
      params: {
        name: data.name,
        grade: data.grade,
        goal: data.goal,
        location: data.location,
        finished: false
      }
    })

    return id
  },
  switchFinishedRoute({ commit, state, getters }, id) {
    commit('SWITCH_FINISHED', id)
    saveToStorage('routes', state)

    const route = getters.getRouteById(id)

    commit('PUSH_ACTION', {
      event: 'ROUTE_CHANGE_STATUS',
      target: route.id,
      params: {
        finished: route.finished
      }
    })
  },
  addProgression({ commit, state }, data) {
    let id = flake.gen()

    commit('ADD_PROGRESSION', { data, id })
    saveToStorage('routes', state)

    commit('PUSH_ACTION', {
      event: 'PROGRESSION_ADD',
      target: id,
      params: {
        route: data.id,
        date: data.date,
        notes: data.notes
      }
    })
  },
  removeProgression({ commit, state }, data) {
    commit('REMOVE_PROGRESSION', data)
    saveToStorage('routes', state)

    commit('PUSH_ACTION', {
      event: 'PROGRESSION_REMOVE',
      id: data.progression.id,
      params: {
        route: data.route,
        date: data.progression.date,
        notes: data.progression.notes
      }
    })
  },
  updateRoute({ commit, state }, data) {
    commit('UPDATE_ROUTE', data)
    saveToStorage('routes', state)

    commit('PUSH_ACTION', {
      event: 'ROUTE_UPDATE',
      target: data.id,
      params: {
        name: data.name,
        grade: data.grade,
        goal: data.goal,
        location: data.location,
        finished: data.finished
      }
    })
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

    commit('PUSH_ACTION', {
      event: 'ROUTE_TRANSFER',
      target: data.route,
      params: {
        location: data.location
      }
    })
  },
  removeRoute({ commit, state, getters }, id) {
    const route = getters.getRouteById(id)

    commit('PUSH_ACTION', {
      event: 'ROUTE_DELETE',
      target: id,
      params: {
        name: route.name,
        grade: route.grade,
        goal: route.goal,
        location: route.location,
        finished: route.finished
      }
    })

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
