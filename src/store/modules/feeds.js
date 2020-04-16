import {loadFromStorage, saveToStorage} from '@/utils/storage'

const state = loadFromStorage('feeds')

const getters = {}

const mutations = {
  ADD_FEED (state, url) {
    state.push(url)
  },
  DELETE_FEED (state, url) {
    state = state.filter(feed => feed !== url)
  }
}

const actions = {
  addFeed ({ commit, state }, url) {
    commit('ADD_FEED', url)
    saveToStorage('feeds', state)
  },
  deleteFeed ({ commit, state }, url) {
    commit('DELETE_FEED', url)
    saveToStorage('feeds', state)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
