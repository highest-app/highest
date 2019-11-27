<template>
  <v-app>
    <v-content>
      <router-view/>
    </v-content>

    <v-bottom-navigation
      v-model="bottomNav"
      color="primary"
      fixed
      app
    >
      <v-btn v-for="item in menu" :key="item.name" :to="item.route">
        <span>{{item.name}}</span>
        <v-icon>{{item.icon}}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'App',
  data: () => ({
    bottomNav: '',

    menu: [
      {
        name: 'Flux',
        route: '/',
        icon: 'mdi-rss'
      },
      {
        name: 'Lieux',
        route: '/locations',
        icon: 'mdi-map-marker-outline'
      },
      {
        name: 'Voies',
        route: '/routes',
        icon: 'mdi-routes'
      },
      {
        name: 'Paramètres',
        route: '/settings',
        icon: 'mdi-settings-outline'
      }
    ]
  }),
  mounted () {
    let checks = ['routes', 'locations', 'settings']
    checks.forEach(element => {
      if (localStorage.getItem(element) === undefined) {
        localStorage.setItem(element, '[]')
      }
    })
    this.$vuetify.theme.dark = this.darkTheme
  },
  computed: {
    ...mapGetters(['darkTheme'])
  },
  watch: {
    darkTheme (value) {
      this.$vuetify.theme.dark = value
    }
  }
};
</script>
