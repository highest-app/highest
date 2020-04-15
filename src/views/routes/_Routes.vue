<template>
  <v-content>
    <app-bar
      v-if="$vuetify.breakpoint.mdAndUp"
      :title="$tc('generic.route', 2)">
      <template #top-bar-actions>
        <route-adding
          v-if="getLocations.length > 0"
          @close="refreshRoutes"/>
      </template>
    </app-bar>
    <app-bar
      v-else
      :title="$t('routes.all')"
      small-only>
      <template #bar-left-actions>
        <a
          class="hidden-md-and-up"
          @click="$router.back()">
          {{ $t('terms.back') }}
        </a>
      </template>
    </app-bar>
    <page-body>
      <list-group>
        <routes-list
          :routes="routes"
          show-location/>
      </list-group>
    </page-body>
  </v-content>
</template>

<script>
import { mapGetters } from 'vuex'
import RouteAdding from '@/views/routes/RouteAdding'
import RoutesList from '@/views/routes/RoutesList'

export default {
  name: 'AllRoutes',
  components: { RouteAdding, RoutesList },
  data () {
    return {
      routes: []
    }
  },
  mounted () {
    this.refreshRoutes()
  },
  computed: {
    ...mapGetters(['getRoutes', 'getLocations'])
  },
  methods: {
    refreshRoutes () {
      this.routes = this.getRoutes
    }
  }
}
</script>
