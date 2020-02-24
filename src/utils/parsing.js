import moment from 'moment'
import i18n from '../plugins/i18n'

function dateToText(date) {
  let format = ''
  switch (i18n.locale) {
    case 'fr':
      format = 'dddd Do MMMM YYYY'
      break
    case 'en':
      format = 'dddd, MMMM Do YYYY'
      break
  }
  return moment(date).format(format)
}

export { dateToText }
