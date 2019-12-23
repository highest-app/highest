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
        paragraph: colors.grey.darken2,
      },
      dark: {
        ...theme,
        paragraph: colors.grey.lighten2,
      }
    },
  },
  lang: {
    locales: { fr },
    current: 'fr'
  }
})
