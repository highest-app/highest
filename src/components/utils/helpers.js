import Vue from 'vue'

function createFunctional(name, tag = 'div') {
  return Vue.component(name, {
    name,
    functional: true,
    render (createElement, { data, children }) {
      data.staticClass = name
      return createElement(
        tag,
        data,
        children
      )
    }
  })
}

export { createFunctional }
