<template>
  <v-list class="background">
    <v-list-item v-if="routes.length === 0">
      {{ $t('routes.noRoutes') }}
    </v-list-item>
    <template v-for="(route, i) in routes">
      <v-list-item
        :key="`${route.id}--list-item`"
        no-action>
        <div class="v-list-item__icon v-list-group__header__prepend-icon">
          <v-avatar>
            <v-img
              :src="getPicture(route)"
              class="routes-list"
              style="background: rgba(0,0,0,.3)">
              <v-tooltip
                open-delay="500"
                bottom>
                <template #activator="{ on }">
                  <v-btn
                    icon
                    @click.stop="switchFinishedRoute(route.id)"
                    v-on="on">
                    <v-icon :color="icons.get(route).color">{{ icons.get(route).icon }}</v-icon>
                  </v-btn>
                </template>
                <span>{{ $t('routes.markAsFinished') }}</span>
              </v-tooltip>
            </v-img>
          </v-avatar>
        </div>
        <v-list-item-content>
          <v-list-item-title>
            <v-icon :style="`color: ${route.color}`">mdi-circle</v-icon>
            <template v-if="showLocation">
              <router-link :to="`/locations/${route.location}`">
                {{ getLocationById(route.location).name }}
              </router-link>
              &mdash;
            </template>
            {{ route.grade }}
          </v-list-item-title>
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
import { mapGetters, mapActions } from 'vuex'
import { routeIcons } from '@/utils/data'
import { dateToText } from '@/utils/parsing'

export default {
  name: 'RoutesList',
  props: {
    routes: {
      type: Array,
      required: true
    },
    showLocation: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    icons: routeIcons
  }),
  computed: {
    ...mapGetters(['getLocationById'])
  },
  methods: {
    ...mapActions(['switchFinishedRoute']),
    dateToText,
    getPicture (route) {
      if (route.photos[0] === undefined) {
        return this.getLocationById(route.location).photos[0]
      } else {
        return route.photos[0]
      }
    }
  }
}
</script>

<style lang="stylus">
  .v-image.routes-list .v-responsive__content
    justify-content: center
    align-items: center
</style>
