import flake from '../../utils/flake'
import { loadFromStorage, saveToStorage } from '@/utils/storage'

const state = {
  ...loadFromStorage('assets')
}

const getters = {}

const mutations = {
  ADD_ASSET (state, data) {
    this.state.assets[data.id] = data.content
  }
}

const actions = {
  addAsset ({state, commit}, content) {
    let id = flake.gen()

    commit('ADD_ASSET', { content, id })
    saveToStorage('assets', state)
    return id
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
