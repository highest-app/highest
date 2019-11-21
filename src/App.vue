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
      <v-btn value="feeds" to="/">
        <span>Flux</span>
        <v-icon>mdi-rss</v-icon>
      </v-btn>

      <v-btn value="locations" to="/locations">
        <span>Lieux</span>
        <v-icon>mdi-map-marker-outline</v-icon>
      </v-btn>

      <v-btn value="routes" to="/routes">
        <span>Voies</span>
        <v-icon>mdi-routes</v-icon>
      </v-btn>

      <v-btn value="settings" to="/settings">
        <span>Paramètres</span>
        <v-icon>mdi-settings-outline</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    bottomNav: ''
  }),
  mounted () {
    let checks = ['routes', 'locations', 'settings']
    checks.forEach(element => {
      if (localStorage.getItem(element) === undefined) {
        localStorage.setItem(element, '[]')
      }
    })
  }
};
</script>
