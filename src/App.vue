<template>
  <v-app>
    <v-content>
      <transition :name="transition">
        <router-view/>
      </transition>
    </v-content>

    <v-bottom-navigation
      v-model="bottomNav"
      color="primary"
      fixed
      app>
      <v-btn
        v-for="item in menu"
        :key="item.name"
        :to="item.route">
        <span>{{ item.name }}</span>
        <v-icon>{{ item.icon }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  data: () => ({
    bottomNav: '',
    transition: '',
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
    let checks = [
      ['routes', '[]'],
      ['locations', '[]'],
      ['settings', '{}']
    ]
    checks.forEach(element => {
      if (localStorage.getItem(element[0]) === undefined) localStorage.setItem(element[0], element[1])
    })
    this.$vuetify.theme.dark = this.darkTheme
  },
  computed: {
    ...mapGetters(['darkTheme'])
  },
  watch: {
    darkTheme (value) {
      this.$vuetify.theme.dark = value
    },
    '$route' (to, from) {
      if (to.name === "routes" && from.name === "locations") this.transition = 'slide-x-transition'
      if (to.name === "locations" && from.name === "routes") this.transition = 'slide-x-reverse-transition'
    }
  }
};
</script>
