import Vue from 'vue'
import moment from 'moment'

import store from '../store'

const today = new Date().toISOString().substr(0, 10)
const formats = {
  fr: 'dddd Do MMMM YYYY',
  en: 'dddd D MMM YYYY'
}

function dateToText(date) {
  let format = formats[store.getters.locale]
  return moment(date).format(format)
}

Vue.mixin({
  data () {
    return {
      today,
      formats
    }
  },
  methods: {
    dateToText
  }
})

export { today }
