const state = {
  data: JSON.parse(localStorage.getItem('settings'))
}

const getters = {
  theme: state => state.data.theme
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