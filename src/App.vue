<template>
  <v-app v-cloak>
    <snackbar/>
    <v-navigation-drawer
      :app="$vuetify.breakpoint.mdAndUp"
      class="hidden-sm-and-down"
      permanent>
      <v-list
        dense
        nav>
        <router-link to="/">
          <v-img
            width="90%"
            src="/img/logo-large.png"
            alt="Highest logo"/>
        </router-link>
        <v-list-item>
          <v-text-field
            v-model="search"
            :label="`${$t('search.title')}...`"
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
            <v-icon left>mdi-cog-outline</v-icon> {{ $t('settings.title') }}
          </v-btn>
          <v-spacer/>
          <v-tooltip
            v-if="!settings.autoDarkTheme"
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
            <span>{{ $t('settings.display.theme.invertColors') }}</span>
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
import { mapState, mapActions } from 'vuex'
import RouteCategories from '@/views/routes/RouteCategories'
import log from '@/utils/logger'
import Snackbar from '@/views/app/Snackbar'

export default {
  name: 'App',
  components: { Snackbar, RouteCategories },
  data () {
    return {
      bottomNav: '',
      locationDialog: false,

      search: '',

      menu: [
        { name: 'home.title', route: '/', icon: 'mdi-home-outline' },
        { name: 'routes.title', route: '/routes/all', icon: 'mdi-routes' },
        { name: 'competitions.title', route: '/competitions', icon: 'mdi-medal' }
      ],
      mobileMenu: [
        { name: 'home.title', route: '/', icon: 'mdi-home-outline' },
        { name: 'routes.title', route: '/routes', icon: 'mdi-routes' },
        { name: 'competitions.title', route: '/competitions', icon: 'mdi-medal' },
        { name: 'search.title', route: '/search', icon: 'mdi-magnify' },
      ]
    }
  },
  mounted () {
    log('App', 'log', 'App initialized successfully')
    this.setTheme()
    this.setLocale()
  },
  methods: {
    ...mapActions(['invertColors']),
    setTheme () {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      let darkTheme = this.settings.autoDarkTheme ? prefersDark : this.settings.darkTheme
      this.$vuetify.theme.dark = darkTheme
      log('App', 'log', `Dark theme set to ${darkTheme}`)
    },
    setLocale () {
      this.$i18n.locale = this.settings.locale
      this.$vuetify.lang.current = this.settings.locale
      moment.locale(this.settings.locale)
      log('App', 'log', `Locale set to ${this.settings.locale}`)
    },
    gotoSearch () {
      this.$router.push({
        name: 'search',
        params: { query: this.search },
        query: { q: this.search }
      })
    }
  },
  computed: mapState(['settings']),
  watch: {
    'settings.darkTheme' () {
      this.setTheme()
    },
    'settings.autoDarkTheme' () {
      this.setTheme()
    },
    'settings.locale' () {
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
