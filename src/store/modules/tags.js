import { loadFromStorage, saveToStorage } from '@/utils/storage'
import flake from '@/utils/flake'
import { defaultTags } from '@/utils/data'

const state = loadFromStorage('tags')

const getters = {
  getTagById: state => id => state.find(tag => tag.id === id)
}

const mutations = {
  ADD_TAG(state, data) {
    state.push({
      id: flake.gen(),
      name: data.name,
      color: data.color,
      default: false
    })
  },
  UPDATE_TAG(state, data) {
    let tag = state.find(tag => tag.id === data.id)
    tag.default = false
    tag.name = data.name
    tag.color = data.color
  },
  REMOVE_TAG(state, id) {
    let indexToRemove = state.findIndex(tag => tag.id === id)
    state.splice(indexToRemove, 1)
  },
  RESET_TAGS(state) {
    // eslint-disable-next-line no-unused-vars
    state = defaultTags.slice()
  }
}

const actions = {
  addTag({ commit, state }, entryData) {
    commit('ADD_TAG', entryData)
    saveToStorage('tags', state)
  },
  updateTag({ commit, state }, entryData) {
    commit('UPDATE_TAG', entryData)
    saveToStorage('tags', state)
  },
  removeTag({ commit, state }, id) {
    commit('REMOVE_TAG', id)
    commit('PURGE_TAG', id)
    saveToStorage('tags', state)
  },
  resetTags({ commit, state }, entryData) {
    commit('RESET_TAGS', entryData)
    commit('RESET_ROUTE_TAGS')
    saveToStorage('tags', state)
  },
}

export default { state, getters, mutations, actions }
