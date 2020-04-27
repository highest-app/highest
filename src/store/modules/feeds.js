import { loadFromStorage, saveToStorage } from '@/utils/storage'

const state = loadFromStorage('feeds')

const getters = {}

const mutations = {
  ADD_FEED (state, url) {
    state.push(url)
  },
  REMOVE_FEED (state, url) {
    state = state.filter(feed => feed !== url)
  }
}

const actions = {
  addFeed ({ commit, state }, url) {
    commit('ADD_FEED', url)
    saveToStorage('feeds', state)
  },
  removeFeed ({ commit, state }, url) {
    commit('REMOVE_FEED', url)
    saveToStorage('feeds', state)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
