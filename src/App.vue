<template>
  <v-app>
    <v-navigation-drawer
      :app="$vuetify.breakpoint.mdAndUp"
      class="hidden-sm-and-down"
      permanent>
      <v-list
        dense
        nav>
        <v-list-item class="pb-1">
          <v-list-item-content>
            <v-list-item-title
              style="line-height: inherit;"
              class="title">
              Climbing
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-text-field
            label="Recherche..."
            append-icon="mdi-magnify"
            solo
            filled
            dense
            rounded/>
        </v-list-item>
        <v-list-item
          v-for="item in menu"
          :key="item.name"
          :to="item.route"
          link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list
        dense
        nav
        subheader>
        <v-subheader>LIEUX</v-subheader>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Ajouter</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-for="location in locations"
          :key="location.name"
          :to="`/locations/${location.id}`"
          link>
          <v-list-item-icon>
            <v-icon>mdi-map-marker-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ location.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list
        dense
        nav
        subheader>
        <v-subheader>TAGS</v-subheader>

        <v-list-item
          v-for="tag in tags"
          :key="tag.name"
          :to="`/tags/${tag.id}`"
          link>
          <v-list-item-icon>
            <v-icon :color="tag.color">mdi-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ tag.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <router-view/>

    <v-bottom-navigation
      v-model="bottomNav"
      color="primary"
      class="hidden-md-and-up translucent"
      fixed
      app>
      <v-btn
        v-for="item in mobileMenu"
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
import { tags } from '@/utils/data'

export default {
  name: 'App',
  data: () => ({
    bottomNav: '',

    tags,
    locations: [],
    menu: [
      { name: 'Flux', route: '/', icon: 'mdi-rss' },
      { name: 'Voies', route: '/routes', icon: 'mdi-routes' },
      { name: 'Paramètres', route: '/settings', icon: 'mdi-settings-outline' }
    ],
    mobileMenu: [
      { name: 'Flux', route: '/', icon: 'mdi-rss' },
      { name: 'Voies', route: '/routes', icon: 'mdi-routes' },
      { name: 'Recherche', route: '/search', icon: 'mdi-magnify' },
      { name: 'Paramètres', route: '/settings', icon: 'mdi-settings-outline' }
    ]
  }),
  mounted () {
    this.$vuetify.theme.dark = this.darkTheme
    this.locations = this.getLocations
  },
  computed: {
    ...mapGetters(['darkTheme', 'getLocations'])
  },
  watch: {
    darkTheme (value) {
      this.$vuetify.theme.dark = value
    }
  }
};
</script>
