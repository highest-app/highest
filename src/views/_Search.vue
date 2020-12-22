<template>
  <v-main>
    <app-bar :title="$t('search.title')"/>
    <page-body>
      <v-text-field
        v-if="$vuetify.breakpoint.smAndDown"
        v-model="search"
        :placeholder="$t('search.placeholder')"
        filled
        rounded/>
      <v-container>
        <v-row v-if="search !== ''">
          <v-col
            v-if="routes.length"
            cols="12">
            <h2>{{ $tc('generic.route', 2) }}</h2>
            <routes-list
              :routes="routes"
              show-location
              background/>
          </v-col>
          <v-col
            v-if="competitions.length"
            cols="12">
            <h2>{{ $tc('generic.competition', 2) }}</h2>
            <competitions-list
              :competitions="competitions"
              background/>
          </v-col>
          <v-col
            v-if="locations.length"
            cols="12">
            <h2>{{ $tc('generic.location', 2) }}</h2>
            <locations-list :locations="locations"/>
          </v-col>
        </v-row>
      </v-container>
    </page-body>
  </v-main>
</template>

<script>
import { mapGetters } from 'vuex'
import CompetitionsList from '@/views/competitions/CompetitionsList'
import LocationsList from '@/views/locations/LocationsList'
import RoutesList from '@/views/routes/RoutesList'

export default {
  name: 'Search',
  components: { CompetitionsList, RoutesList, LocationsList },
  props: {
    query: String
  },
  data() {
    return {
      search: ''
    }
  },
  mounted() {
    this.search = this.query
  },
  computed: {
    ...mapGetters(['searchLocations', 'searchRoutes', 'searchCompetitions']),
    locations() {
      return this.search ? this.searchLocations(this.search) : []
    },
    routes() {
      return this.search ? this.searchRoutes(this.search) : []
    },
    competitions() {
      return this.search ? this.searchCompetitions(this.search) : []
    },
  }
}
</script>
