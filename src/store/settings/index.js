import {loadData} from '../../plugins/utils.js'

const state = {
  data: loadData('params')
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