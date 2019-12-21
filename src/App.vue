<template>
  <v-app>
    <router-view/>

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

<style>
:root {
  color-scheme: light dark;
}
.v-content__wrap {
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
.v-bottom-navigation {
  padding-bottom: env(safe-area-inset-bottom) !important;
}
</style>
