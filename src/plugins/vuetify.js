import Vue from 'vue'
import Vuetify from 'vuetify'

import fr from 'vuetify/es5/locale/fr'
import en from 'vuetify/es5/locale/en'
import colors from 'vuetify/lib/util/colors'
import 'vuetify/dist/vuetify.min.css'

import store from '@/store'

Vue.use(Vuetify)

const theme = {
  primary: '#5EA7EF',
  'primary-light': '#ABCCED',
  secondary: '#EFA65E',
  'secondary-light': '#EECAA6',
  error: '#B71C1C',
  'error-light': '#B76565',
  info: colors.blue.base,
  success: colors.green.darken1,
  warning: colors.amber.base
}

export default new Vuetify({
  theme: {
    themes: {
      light: {
        ...theme,
        background: '#f2f2f7',
        sheets: '#fff',
        'sheet-background': '#E1E1E1',
        paragraph: colors.grey.darken2,
        'list-description': colors.grey.darken2,
        'action-icon': '#c4c4c6',
        'action-text': '#8a8a8d'
      },
      dark: {
        ...theme,
        background: '#000',
        sheets: '#1E1E1E',
        'sheet-background': '#191A19',
        paragraph: colors.grey.lighten2,
        'list-description': colors.grey.base,
        'action-icon': '#5a5a5e',
        'action-text': '#98989e'
      }
    },
    options: {
      customProperties: true,
    }
  },
  lang: {
    locales: { en, fr },
    current: store.state.settings.locale
  }
})
