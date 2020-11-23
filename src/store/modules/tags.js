import { loadFromStorage, saveToStorage } from '@/utils/storage'
import flake from '@/utils/flake'
import { defaultTags } from '@/utils/data'

const state = {
  data: loadFromStorage('tags')
}

const getters = {
  getTagById: state => id => state.data.find(tag => tag.id === id)
}

const mutations = {
  ADD_TAG(state, data) {
    state.data.push({
      id: flake.gen(),
      name: data.name,
      color: data.color,
      default: false
    })
  },
  UPDATE_TAGS(state, data) {
    state.data = [...data]
  },
  UPDATE_TAG(state, data) {
    let tag = state.data.find(tag => tag.id === data.id)
    tag.default = false
    tag.name = data.name
    tag.color = data.color
  },
  REMOVE_TAG(state, id) {
    let indexToRemove = state.data.findIndex(tag => tag.id === id)
    state.data.splice(indexToRemove, 1)
  },
  RESET_TAGS(state) {
    // eslint-disable-next-line no-unused-vars
    state.data = defaultTags
  }
}

const actions = {
  addTag({ commit, state }, entryData) {
    commit('ADD_TAG', entryData)
    saveToStorage('tags', state.data)
  },
  updateTags({ commit, state }, entryData) {
    commit('UPDATE_TAGS', entryData)
    saveToStorage('tags', state.data)
  },
  updateTag({ commit, state }, entryData) {
    commit('UPDATE_TAG', entryData)
    saveToStorage('tags', state.data)
  },
  removeTag({ commit, state }, id) {
    commit('REMOVE_TAG', id)
    commit('PURGE_TAG', id)
    saveToStorage('tags', state.data)
  },
  resetTags({ commit, state }) {
    commit('RESET_TAGS')
    commit('RESET_ROUTE_TAGS')
    saveToStorage('tags', state.data)
  },
}

export default { state, getters, mutations, actions }
