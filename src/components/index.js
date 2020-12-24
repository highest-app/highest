import Vue from 'vue'
import * as components from './components'

for (const key in components) {
  const component = components[key]
  Vue.component(key, component)
}
