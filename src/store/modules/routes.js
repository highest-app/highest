import {loadData, saveData} from '../../plugins/utils.js'

const state = {
  data: loadData('routes')
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
      goal: Date.parse(data.goal)/1000,
      finished: false,
      progressions: []
    })
  },
  ADD_PROGRESSION: (state, data) => {
    let route = state.data.filter(route => route.id === data.id)[0]
    route.progressions.push({
      date: data.date,
      notes: data.notes
    })
  }
}

const actions = {
  addRoute: ({commit, state}, entryData) => {
    commit('ADD_ROUTE', entryData)
    saveData('routes', state.data)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}