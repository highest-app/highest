<template>
  <v-list class="background">
    <v-list-item v-if="routes.length === 0">
      {{ $t('routes.noRoutes') }}
    </v-list-item>
    <template v-for="(route, i) in routes">
      <v-list-item
        :key="`${route.id}--list-item`"
        no-action>
        <div
          class="v-list-item__icon v-list-group__header__prepend-icon"
          @click.stop="switchFinishedRoute(route.id)">
          <v-avatar>
            <v-img
              :src="route.photos[0]"
              style="background: rgba(0,0,0,.3)">
              <v-icon :color="icons.get(route).color">{{ icons.get(route).icon }}</v-icon>
            </v-img>
          </v-avatar>
        </div>
        <v-list-item-content>
          <v-list-item-title>{{ route.grade }}</v-list-item-title>
          <v-list-item-subtitle>
            <span class="text--primary">{{ route.goal ? `${$t('routes.for')} ${dateToText(route.goal)}` : $t('routes.noGoal') }}</span>
            <template v-if="route.name !== ''">
              &mdash; {{ route.name }}
            </template>
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn
            :ripple="false"
            icon
            :to="`/locations/${route.location}/${route.id}`">
            <v-icon color="primary">mdi-information-outline</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
      <v-divider
        v-if="i !== routes.length - 1"
        :key="`${route.id}--divider`"
        inset/>
    </template>
  </v-list>
</template>

<script>
import { mapActions } from 'vuex'
import { routeIcons } from '@/utils/data'
import { dateToText } from '@/utils/parsing'

export default {
  name: 'RoutesList',
  props: {
    routes: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    icons: routeIcons
  }),
  methods: {
    ...mapActions(['switchFinishedRoute']),
    dateToText
  }
}
</script>
