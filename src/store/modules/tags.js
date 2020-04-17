import { loadFromStorage, saveToStorage } from '@/utils/storage'

const state = loadFromStorage('tags')

const getters = {
  getTagById: state => id => {
    return state.find(tag => tag.id === id)
  }
}

const mutations = {
  ADD_TAG () {

  }
}

const actions = {
  addTag ({ commit, state }, entryData) {
    commit('ADD_TAG', entryData)
    saveToStorage('tags', state)
  }
}

export default { state, getters, mutations, actions }
