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
      <div class="hidden-md-and-up">
        <list-group>
          <h2>{{ $tc('generic.location', 2) }}</h2>
          <v-bottom-sheet
            v-model="locationDialog"
            scrollable
            inset>
            <template #activator="{ on }">
              <v-col
                cols="12"
                md="6">
                <v-card
                  elevation="0"
                  v-on="on">
                  <v-card-title>{{ $t('locations.add') }}</v-card-title>
                </v-card>
              </v-col>
            </template>
            <v-card class="background">
              <location-adding @close="locationDialog = false"/>
            </v-card>
          </v-bottom-sheet>
          <locations-list :locations="locations"/>
        </list-group>
        <list-group>
          <h2>{{ $tc('generic.tag', 2) }}</h2>
          <v-list
            class="background"
            elevation="0">
            <template v-for="(tag, i) in tags">
              <v-list-item
                :key="`${tag.name}--list-item`"
                :to="`/tags/${tag.id}`"
                link>
                <v-list-item-icon>
                  <v-icon :color="tag.color">mdi-circle</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ $t(`terms.${tag.color}`) }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider
                v-if="i !== tags.length - 1"
                :key="`${tag.name}--divider`"
                inset/>
            </template>
          </v-list>
        </list-group>
      </div>
      <template v-if="locations.length > 0">
        <list-group
          v-for="location in locations"
          :key="location.id">
          <h2>{{ location.name }}</h2>
          <routes-list :routes="routes[location.id]"/>
        </list-group>
      </template>
      <p v-else>{{ $t('locations.noLocations') }}</p>
    </page-body>
  </v-content>
</template>

<script>
import { mapGetters } from 'vuex'
import { grades, tags } from '@/utils/data'
import { dateToText } from '@/utils/parsing'
import LocationAdding from '@/views/parts/LocationAdding'
import RouteAdding from '@/views/parts/RouteAdding'
import RoutesList from '@/views/parts/RoutesList'
import LocationsList from '@/views/parts/LocationsList'

export default {
  name: 'Routes',
  components: {LocationsList, LocationAdding, RouteAdding, RoutesList },
  data () {
    return {
      locations: [],
      parsedLocations: {},
      routes: {},

      locationDialog: false,

      grades,
      tags
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
    ...mapGetters(['getLocations', 'getRoutesByLocation', 'getLocationById'])
  },
  methods: {
    dateToText,
    refreshRoutes () {
      this.routes = {}
      this.locations.forEach(location => {
        this.routes[location.id] = this.getRoutesByLocation(location.id)
      })
    }
  }
}
</script>
