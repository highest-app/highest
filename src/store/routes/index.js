const state = {
  data: JSON.parse(localStorage.getItem('routes'))
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

}

const actions = {

}

export default {
  state,
  getters,
  mutations,
  actions
}