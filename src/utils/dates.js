import Vue from 'vue'
import moment from 'moment'

const today = new Date().toISOString().substr(0, 10)

function dateToText(date) {
  return moment(date).format('LL')
}

Vue.mixin({
  data () {
    return {
      today
    }
  },
  methods: {
    dateToText
  }
})

export { today }
