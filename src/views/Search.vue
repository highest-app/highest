<template>
  <v-content>
    <app-bar :title="$t('pages.search')"/>
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
            v-if="routes.length > 0"
            cols="12">
            <h2>{{ $tc('generic.route', 2) }}</h2>
            <routes-list :routes="routes"/>
          </v-col>
          <v-col
            v-if="competitions.length > 0"
            cols="12">
            <h2>{{ $tc('generic.competition', 2) }}</h2>
            <competitions-list :competitions="competitions"/>
          </v-col>
          <v-col
            v-if="locations.length > 0"
            cols="12">
            <h2>{{ $tc('generic.location', 2) }}</h2>
            <locations-list :locations="locations"/>
          </v-col>
        </v-row>
      </v-container>
    </page-body>
  </v-content>
</template>

<script>
import { mapGetters } from 'vuex'
import CompetitionsList from '@/views/parts/CompetitionsList'
import LocationsList from '@/views/parts/LocationsList'
import RoutesList from '@/views/parts/RoutesList'

export default {
  name: 'Search',
  components: { CompetitionsList, RoutesList, LocationsList },
  props: {
    query: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      search: ''
    }
  },
  mounted () {
    this.search = this.query
  },
  computed: {
    ...mapGetters(['searchLocations', 'searchRoutes', 'searchCompetitions']),
    locations () {
      return this.searchLocations(this.search)
    },
    routes () {
      return this.searchRoutes(this.search)
    },
    competitions () {
      return this.searchCompetitions(this.search)
    },
  }
}
</script>
