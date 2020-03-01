import moment from 'moment'
import i18n from '../plugins/i18n'

const today = new Date().toISOString().substr(0, 10)
const formats = {
  fr: 'dddd Do MMMM YYYY',
  en: 'dddd D MMM YYYY'
}

function dateToText(date) {
  let format = formats[i18n.locale]
  return moment(date).format(format)
}

export {
  today,
  formats,
  dateToText
}
