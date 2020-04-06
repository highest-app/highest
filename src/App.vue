<template>
  <v-app v-cloak>
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

      <route-categories/>

      <template #append>
        <v-divider/>
        <v-row class="px-4 py-2">
          <v-btn
            text
            to="/settings">
            <v-icon left>mdi-cog-outline</v-icon> {{ $t('pages.settings') }}
          </v-btn>
          <v-spacer/>
          <v-tooltip
            open-delay="500"
            top>
            <template #activator="{ on }">
              <v-btn
                icon
                v-on="on"
                @click="invertColors">
                <v-icon>mdi-invert-colors</v-icon>
              </v-btn>
            </template>
            <span>{{ $t('settings.invertColors') }}</span>
          </v-tooltip>
        </v-row>
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
import { mapGetters, mapActions } from 'vuex'
import { tags } from '@/utils/data'
import RouteCategories from '@/views/parts/RouteCategories'

export default {
  name: 'App',
  components: { RouteCategories },
  data () {
    return {
      bottomNav: '',
      locationDialog: false,

      search: '',

      tags,
      locations: [],
      menu: [
        { name: 'pages.home', route: '/', icon: 'mdi-home-outline' },
        { name: 'pages.routes', route: '/routes/all', icon: 'mdi-routes' },
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
    ...mapActions(['invertColors']),
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
