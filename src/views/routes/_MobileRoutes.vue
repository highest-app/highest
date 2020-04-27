<template>
  <v-content>
    <app-bar :title="$tc('generic.route', 2)">
      <template #top-bar-actions>
        <route-adding v-if="locations.length"/>
      </template>
    </app-bar>
    <page-body>
      <div>
        <v-list
          v-if="locations.length"
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
              <v-list-item-title>{{ $t('routes.view.all') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <p
          v-else
          class="ml-2">
          {{ $t('locations.noLocations') }}
        </p>
      </div>
      <route-categories mobile/>
    </page-body>
  </v-content>
</template>

<script>
import { mapState } from 'vuex'
import RouteCategories from '@/views/routes/RouteCategories'
import RouteAdding from '@/views/routes/RouteAdding'

export default {
  name: 'Routes',
  components: { RouteAdding, RouteCategories },
  data () {
    return {
      locationDialog: false
    }
  },
  computed: mapState(['locations'])
}
</script>
