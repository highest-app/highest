<template>
  <v-list class="background">
    <v-list-item v-if="!locations.length">
      {{ $t('locations.noLocations') }}
    </v-list-item>
    <v-list-item v-else-if="!routes.length">
      {{ $t('routes.noRoutes') }}
    </v-list-item>
    <template
      v-for="(route, i) in routes"
      v-else>
      <v-list-item
        :key="`${route.id}--list-item`"
        no-action>
        <div class="v-list-item__icon v-list-group__header__prepend-icon">
          <v-badge
            :value="route.tags.length > 0"
            :color="route.tags.length > 0 ? tag(route.tags[0]).color : ''"
            overlap
            bordered>
            <v-avatar>
              <v-img
                :src="getRouteThumbnail(route)"
                class="routes-list shadowed"
                style="background: rgba(0,0,0,.5)">
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
          </v-badge>
        </div>
        <v-list-item-content>
          <v-list-item-title>
            <v-chip
              :style="`background-color: ${route.color}`"
              tile>
              {{ route.grade }}
            </v-chip>
            &nbsp;
            <span
              v-if="showLocation"
              :to="`/locations/${route.location}`"
              class="overline">
              {{ getLocationById(route.location).name }}
            </span>
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
import { mapState, mapGetters, mapActions } from 'vuex'
import { getRouteThumbnail } from '@/utils/assets'
import { routeIcons } from '@/utils/data'

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
  data () {
    return {
      icons: routeIcons
    }
  },
  computed: {
    ...mapState(['assets', 'locations']),
    ...mapGetters(['getLocationById', 'getTagById'])
  },
  methods: {
    ...mapActions(['switchFinishedRoute']),
    getRouteThumbnail,
    tag (id) {
      return this.getTagById(id)
    }
  }
}
</script>

<style lang="stylus">
  .v-image.routes-list .v-responsive__content
    justify-content: center
    align-items: center
</style>
