import {loadFromStorage, saveToStorage} from '../../utils/storage.js'

const state = {
  data: loadFromStorage('routes')
}

const getters = {
  getRoutes: state => state.data,
  getFinishedRoutes: state => {
    return state.data.filter(route => route.finished)
  },
  getRoutesByLocation: (state) => (id) => {
    return state.data.filter(route => route.location === id)
  }
}

const mutations = {
  ADD_ROUTE: (state, data) => {
    state.data.push({
      name: data.name,
      id: data.name.toLowerCase().replace(' ', '-'),
      location: data.location,
      grade: data.grade,
      length: data.length,
      notes: data.notes,
      photos: [],
      goal: data.goal ? Date.parse(data.goal)/1000 : data.goal,
      finished: false,
      progressions: []
    })
  },
  SWITCH_FINISHED: (state, id) => {
    state.data.find(route => route.id === id).finished = !state.data.find(route => route.id === id).finished
  },
  ADD_PROGRESSION: (state, data) => {
    let route = state.data.filter(route => route.id === data.id)[0]
    route.progressions.push({
      date: data.date,
      notes: data.notes
    })
  },
  REMOVE_ROUTE: (state, id) => {
    state.data.splice(state.data.findIndex(route => route.id === id), 1)
  }
}

const actions = {
  addRoute: ({commit, state}, entryData) => {
    commit('ADD_ROUTE', entryData)
    saveToStorage('routes', state.data)
  },
  switchFinishedRoute: ({commit, state}, route) => {
    commit('SWITCH_FINISHED', route)
    saveToStorage('routes', state.data)
  },
  removeRoute: ({commit, state}, id) => {
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