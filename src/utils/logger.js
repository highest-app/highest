import { theme } from '@/plugins/vuetify'

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

export default log
