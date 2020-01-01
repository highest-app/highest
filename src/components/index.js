import * as components from './components'

export default {
  install (Vue, ) {
    for (const key in components) {
      const component = components[key]
      Vue.component(key, component)
    }
  }
}
