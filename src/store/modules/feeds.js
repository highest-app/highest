import {loadFromStorage, saveToStorage} from '@/utils/storage'

const state = {
  data: loadFromStorage('feeds')
}

const getters = {
  getFeeds: state => state.data
}

const mutations = {
  ADD_FEED (url) {
    state.data.push(url)
  },
  REMOVE_FEED (url) {
    state.data.filter(feed => feed !== url)
  }
}

const actions = {
  addFeed ({ commit, state }, url) {
    commit('ADD_FEED', url)
    saveToStorage('feeds', state.data)
  },
  removeFeed ({ commit, state }, url) {
    commit('REMOVE_FEED', url)
    saveToStorage('feeds', state.data)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
