import Vue from 'vue'
import Vuetify from 'vuetify'

import fr from 'vuetify/es5/locale/fr'
import en from 'vuetify/es5/locale/en'
import colors from 'vuetify/lib/util/colors'
import 'vuetify/dist/vuetify.min.css'

import store from '../store'

Vue.use(Vuetify)

const theme = {
  error: colors.red.darken4,
  info: colors.blue.base,
  success: colors.green.darken1,
  warning: colors.amber.base
}

export default new Vuetify({
  theme: {
    themes: {
      light: {
        ...theme,
        primary: '#1e3799',
        secondary: '#E17B13',
        accent: '#E1C413',
        background: '#f2f2f7',
        sheets: '#fff',
        paragraph: colors.grey.darken2,
        'list-description': colors.grey.darken2
      },
      dark: {
        ...theme,
        primary: '#4a69bd',
        secondary: '#FFA351',
        accent: '#FFE351',
        background: '#000',
        sheets: '#1c1c1d',
        paragraph: colors.grey.lighten2,
        'list-description': colors.grey.base
      }
    },
    options: {
      customProperties: true,
    }
  },
  lang: {
    locales: { fr, en },
    current: store.getters.locale
  }
})
