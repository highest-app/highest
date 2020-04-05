<template>
  <v-app v-cloak>
    <v-dialog
      v-model="locationDialog"
      max-width="50%">
      <LocationAdding @close="locationDialog = false"/>
    </v-dialog>
    <v-navigation-drawer
      :app="$vuetify.breakpoint.mdAndUp"
      class="hidden-sm-and-down"
      permanent>
      <v-list
        dense
        nav>
        <img
          width="90%"
          src="/img/logo-large.png"
          alt="Highest logo">
        <v-list-item>
          <v-text-field
            v-model="search"
            :label="`${$t('pages.search')}...`"
            clearable
            rounded
            filled
            dense
            solo
            @keydown.enter="gotoSearch"/>
        </v-list-item>
        <v-list-item
          v-for="item in menu"
          :key="item.name"
          :to="item.route"
          class="primary--text"
          link>
          <v-list-item-icon class="box-icon gradient--primary">
            <v-icon medium>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ $t(item.name) }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list
        dense
        nav
        subheader>
        <v-subheader>{{ $tc('generic.location', 2).toUpperCase() }}</v-subheader>
        <v-list-item
          class="gradient--secondary"
          @click="locationDialog = true">
          <v-list-item-icon>
            <v-icon color="white">mdi-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{ $t('terms.add') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-for="location in locations"
          :key="location.name"
          :to="`/locations/${location.id}`"
          class="primary--text"
          link>
          <v-list-item-icon class="box-icon gradient--secondary">
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
        <v-subheader>{{ $tc('generic.tag', 2).toUpperCase() }}</v-subheader>

        <v-list-item
          v-for="tag in tags"
          :key="tag.name"
          :to="`/tags/${tag.id}`"
          link>
          <v-list-item-icon>
            <v-icon :color="tag.color">mdi-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ $t(`terms.${tag.color}`) }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-divider/>
          <v-list dense>
            <v-list-item to="/settings">
              <v-list-item-icon>
                <v-icon left>mdi-cog-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ $t('pages.settings') }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </div>
      </template>
    </v-navigation-drawer>

    <router-view :key="$route.fullPath"/>

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
        <span>{{ $t(item.name) }}</span>
        <v-icon>{{ item.icon }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import { tags } from '@/utils/data'
import LocationAdding from '@/views/parts/LocationAdding'

export default {
  name: 'App',
  components: { LocationAdding },
  data () {
    return {
      bottomNav: '',
      locationDialog: false,

      search: '',

      tags,
      locations: [],
      menu: [
        { name: 'pages.home', route: '/', icon: 'mdi-home-outline' },
        { name: 'pages.routes', route: '/routes', icon: 'mdi-routes' },
        { name: 'pages.competitions', route: '/competitions', icon: 'mdi-medal' }
      ],
      mobileMenu: [
        { name: 'pages.home', route: '/', icon: 'mdi-home-outline' },
        { name: 'pages.routes', route: '/routes', icon: 'mdi-routes' },
        { name: 'pages.competitions', route: '/competitions', icon: 'mdi-medal' },
        { name: 'pages.search', route: '/search', icon: 'mdi-magnify' },
      ]
    }
  },
  mounted () {
    this.setTheme()
    this.setLocale()
    this.locations = this.getLocations
  },
  methods: {
    setTheme () {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      if (prefersDark && this.autoDarkTheme) this.$vuetify.theme.dark = true
      else this.$vuetify.theme.dark = this.darkTheme
    },
    setLocale () {
      this.$i18n.locale = this.locale
      this.$vuetify.lang.current = this.locale
      moment.locale(this.locale)
    },
    gotoSearch () {
      this.$router.push({
        name: 'search',
        params: { query: this.search },
        query: { q: this.search }
      })
    }
  },
  computed: {
    ...mapGetters(['darkTheme', 'autoDarkTheme', 'locale', 'getLocations']),
  },
  watch: {
    darkTheme () {
      this.setTheme()
    },
    autoDarkTheme () {
      this.setTheme()
    },
    locale () {
      this.setLocale()
    },
    search () {
      if (this.$router.currentRoute.name === 'search') {
        this.gotoSearch()
      }
    }
  }
}
</script>
