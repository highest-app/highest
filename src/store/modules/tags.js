import { loadFromStorage, saveToStorage } from '../../utils/storage'

const state = {
  data: loadFromStorage('tags')
}

const getters = {
  getTags: state => state.data,
  getTagById: state => id => {
    return state.data.find(tag => tag.id === id)
  }
}

const mutations = {
  ADD_TAG () {

  }
}

const actions = {
  addTag ({ commit, state }, entryData) {
    commit('ADD_TAG', entryData)
    saveToStorage('tags', state.data)
  }
}

export default { state, getters, mutations, actions }
