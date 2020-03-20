import {loadFromStorage, saveToStorage} from '@/utils/storage'

const state = {
  data: loadFromStorage('feeds')
}

const getters = {
  getFeeds: state => state.data
}

const mutations = {
  ADD_FEED (state, url) {
    state.data.push(url)
  },
  DELETE_FEED (state, url) {
    state.data = state.data.filter(feed => feed !== url)
  }
}

const actions = {
  addFeed ({ commit, state }, url) {
    commit('ADD_FEED', url)
    saveToStorage('feeds', state.data)
  },
  deleteFeed ({ commit, state }, url) {
    commit('DELETE_FEED', url)
    saveToStorage('feeds', state.data)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
