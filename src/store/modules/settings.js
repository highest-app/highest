import {loadFromStorage, saveToStorage} from '../../utils/storage.js'

const state = {
  data: loadFromStorage('settings')
}

const getters = {
  getSettings: state => state.data,
  darkTheme: state => state.data.darkTheme
}

const mutations = {
  SET_SETTING: (state, data) => {
    state[data['name']] = data['value']
  },
  UPDATE_SETTINGS: (state, data) => {
    state.data = data
  }
}

const actions = {
  setSetting: ({commit, state}, data) => {
    commit('SET_SETTING', data)
    saveToStorage('settings', state.data)
  },
  updateSettings: ({commit, state}, data) => {
    commit('UPDATE_SETTINGS', data)
    saveToStorage('settings', state.data)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}