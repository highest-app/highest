import { loadFromStorage, saveToStorage } from '@/utils/storage.js'

const state = loadFromStorage('settings')

const getters = {
  locale: state => state.locale === undefined ? 'en' : state.locale
}

const mutations = {
  UPDATE_SETTINGS (state, data) {
    state = data
  },
  INVERT_COLORS (state) {
    state.autoDarkTheme = false
    state.darkTheme = !state.darkTheme
  }
}

const actions = {
  updateSettings ({ commit, state }, data) {
    commit('UPDATE_SETTINGS', data)
    saveToStorage('settings', state)
  },
  invertColors ({ commit, state}) {
    commit('INVERT_COLORS')
    saveToStorage('settings', state)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
