import Vue from 'vue'
import Vuetify from 'vuetify'

import fr from 'vuetify/es5/locale/fr'
import colors from 'vuetify/lib/util/colors'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

const theme = {
  primary: colors.lightGreen.base,
  secondary: colors.lime.base,
  accent: colors.blue.accent1,
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
        background: '#f2f2f7',
        sheets: '#fff',
        paragraph: colors.grey.darken2,
        'list-description': colors.grey.darken2
      },
      dark: {
        ...theme,
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
    locales: { fr },
    current: 'fr'
  }
})
