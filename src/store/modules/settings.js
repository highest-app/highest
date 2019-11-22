import {loadFromStorage} from '../../utils/storage.js'

const state = {
  data: loadFromStorage('settings')
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