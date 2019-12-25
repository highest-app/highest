import moment from 'moment'

function dateToText(date) {
  return moment(date).format('dddd Do MMMM YYYY')
}

export { dateToText }
