import flake from '@/utils/flake'
import { loadFromStorage, saveToStorage } from '@/utils/storage'

const state = loadFromStorage('assets')

const getters = {}

const mutations = {
  ADD_ASSET (state, data) {
    state[data.id] = data.content
  },
  REMOVE_ASSET(state, id) {
    delete state[id]
  }
}

const actions = {
  addAsset ({ state, commit }, content) {
    let id = flake.gen()

    commit('ADD_ASSET', { content, id })
    saveToStorage('assets', state)
    return id
  },
  removeAsset({ commit, state }, id) {
    commit('REMOVE_ASSET', id)
    commit('PURGE_ROUTES_ASSET', id)
    commit('PURGE_LOCATIONS_ASSET', id)
    saveToStorage('assets', state)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
