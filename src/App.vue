<template>
  <v-app>
    <v-dialog
      v-model="locationDialog"
      max-width="50%">
      <v-card class="background">
        <LocationAdding @close="locationDialog = false"/>
      </v-card>
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
            :label="`${$t('pages.search')}...`"
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
          class="primary--text"
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
        <v-subheader>{{ $tc('generic.location', 2).toUpperCase() }}</v-subheader>
        <v-list-item
          class="secondary"
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

      tags,
      locations: [],
      menu: [
        { name: this.$t('pages.home'), route: '/', icon: 'mdi-home-outline' },
        { name: this.$tc('generic.route', 2), route: '/routes', icon: 'mdi-routes' },
        { name: this.$tc('generic.competition', 2), route: '/competitions', icon: 'mdi-medal' },
        { name: this.$t('pages.settings'), route: '/settings', icon: 'mdi-settings-outline' }
      ],
      mobileMenu: [
        { name: this.$t('pages.home'), route: '/', icon: 'mdi-home-outline' },
        { name: this.$tc('generic.route', 2), route: '/routes', icon: 'mdi-routes' },
        { name: this.$tc('generic.competition', 2), route: '/competitions', icon: 'mdi-medal' },
        { name: this.$t('pages.search'), route: '/search', icon: 'mdi-magnify' },
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
    }
  }
}
</script>
