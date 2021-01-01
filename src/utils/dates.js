import Vue from 'vue'
import { DateTime } from 'luxon'

DateTime.local().setLocale('en')

const today = new Date().toISOString().substr(0, 10)

function dateToText(date) {
  if (this.$i18n.locale) {
    return DateTime.fromISO(date).setLocale(this.$i18n.locale).toLocaleString(DateTime.DATE_FULL)
  } else return DateTime.fromISO(date).toLocaleString(DateTime.DATE_FULL)
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
