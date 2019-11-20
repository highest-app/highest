const state = {
  data: JSON.parse(localStorage.getItem('locations'))
}

const getters = {
  getLocations: state => state.data,
  getLocationById: state => id => {
    return state.data.filter(location => location.id === id)[0]
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