import { theme } from '@/plugins/vuetify'
import store from '@/store'

function log(type, level, message, details = null) {
  let output = `%c[${type}] %c${message}`
  if (details !== null) output += `\n%c${details}`
  console[level](
    output,
    `color: ${theme.primary}; font-weight: bold`,
    'color: inherit',
    details === null ? '' : 'color: #b9b9b9'
  )
}

function error(type, message, details) {
  log(type, 'error', message, details)
  store.commit('SHOW_SNACKBAR', { message, details, error: true })
}

export default log
export { log, error }
