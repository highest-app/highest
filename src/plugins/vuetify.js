import Vue from 'vue'
import Vuetify from 'vuetify'

import fr from 'vuetify/es5/locale/fr'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

const theme = {
  primary: '#8BC34A',
  secondary: '#CDDC39',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107'
}

export default new Vuetify({
  theme: {
    themes: {
      light: theme,
      dark: theme
    },
  },
  lang: {
    locales: { fr },
    current: 'fr'
  }
})
