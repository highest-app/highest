<template>
  <v-content>
    <app-bar :title="$tc('generic.route', 2)">
      <template #top-bar-actions>
        <route-adding
          v-if="locations.length > 0"
          @close="refreshRoutes"/>
      </template>
    </app-bar>
    <page-body>
      <div>
        <v-list
          v-if="locations.length > 0"
          class="background"
          subheader
          dense>
          <v-subheader>{{ $t('terms.general').toUpperCase() }}</v-subheader>
          <v-list-item
            to="/routes/all">
            <v-list-item-icon class="box-icon gradient--gray">
              <v-icon>mdi-routes</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t('routes.all') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <p v-else>{{ $t('locations.noLocations') }}</p>
      </div>
      <route-categories mobile/>
    </page-body>
  </v-content>
</template>

<script>
import { mapGetters } from 'vuex'
import { grades } from '@/utils/data'
import { dateToText } from '@/utils/parsing'
import RouteCategories from '@/views/parts/RouteCategories'
import RouteAdding from '@/views/parts/RouteAdding'

export default {
  name: 'Routes',
  components: { RouteAdding, RouteCategories },
  data () {
    return {
      locations: [],
      parsedLocations: {},
      routes: [],

      locationDialog: false,

      grades
    }
  },
  mounted () {
    this.locations = this.getLocations
    this.locations.forEach((location) => {
      this.parsedLocations[location.name] = location.id
    })
    this.refreshRoutes()
  },
  computed: {
    ...mapGetters(['getLocations', 'getRoutesByLocation', 'getLocationById', 'getRoutes'])
  },
  methods: {
    dateToText,
    refreshRoutes () {
      this.routes = this.getRoutes
    }
  }
}
</script>
