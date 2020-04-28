import flake from '@/utils/flake'
import log from '@/utils/logger'
import { loadFromStorage, saveToStorage } from '@/utils/storage'

const state = loadFromStorage('actions')

const mutations = {
  PUSH_ACTION(state, payload) {
    state.push({
      id: flake.gen(),
      timestamp: Date.now(),
      event: payload.event,
      params: payload.params,
      target_id: payload.target_id
    })
    log('Action', 'log', `New action pushed : ${payload.event}`, JSON.stringify(payload.params))
    saveToStorage('actions', state)
  }
}

export default { state, mutations }
