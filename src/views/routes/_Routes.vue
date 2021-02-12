<template>
  <v-main>
    <app-bar
      v-if="$vuetify.breakpoint.mdAndUp"
      :title="$tc('generic.route', 2)"
      title-align="end">
      <template #top-bar-actions>
        <route-adding v-if="locations.length > 0"/>
      </template>
    </app-bar>
    <app-bar
      v-else
      :title="$t('routes.view.all')"
      small-only>
      <template #bar-left-actions>
        <app-link
          class="hidden-md-and-up"
          @click="$router.back()">
          {{ $t('terms.actions.back') }}
        </app-link>
      </template>
    </app-bar>
    <page-body>
      <list-group>
        <routes-list
          :routes="routes"
          show-location
          background/>
      </list-group>
    </page-body>
  </v-main>
</template>

<script>
import { mapState } from 'vuex'
import RouteAdding from '@/views/routes/RouteAdding'
import RoutesList from '@/views/routes/RoutesList'

export default {
  name: 'AllRoutes',
  components: { RouteAdding, RoutesList },
  computed: mapState(['routes', 'locations'])
}
</script>
