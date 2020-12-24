<template>
  <v-list :class="{ background, 'py-0': paddingless }">
    <popup
      v-model="removePopup"
      right-text="terms.actions.remove"
      critical
      @right-action="confirmRemove">
      <template #description>{{ $t('routes.actions.removeConfirmation') }}</template>
    </popup>
    <illustration
      v-if="!locations.length"
      image="/img/illustrations/location.svg"
      label="locations.noLocations"/>
    <illustration
      v-else-if="!routes.length"
      image="/img/illustrations/road-sign.svg"
      label="routes.view.noRoutes"/>
    <template
      v-for="(route, i) in routes"
      v-else>
      <v-list-item
        :key="`${route.id}--list-item`"
        :aria-label="$t('routes.helps.view', { grade: route.grade, name: route.name === '' ? '' : `(${route.name})`, location: getLocationById(route.location).name })"
        no-action>
        <div class="v-list-item__icon v-list-group__header__prepend-icon">
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
                    :aria-label="$t('routes.helps.markAsFinished', { grade: route.grade, name: route.name === '' ? '' : `(${route.name})`, location: getLocationById(route.location).name })"
                    icon
                    @click.stop="switchFinishedRoute(route.id)"
                    v-on="on">
                    <v-icon :color="icons.get(route).color">{{ icons.get(route).icon }}</v-icon>
                  </v-btn>
                </template>
                <span>{{ $t('routes.actions.markAsFinished') }}</span>
              </v-tooltip>
            </v-img>
          </v-avatar>
        </div>
        <v-list-item-content v-ripple>
          <router-link :to="{ name: 'route', params: { location: route.location, route: route.id }}">
            <v-list-item-title>
              <v-chip
                :style="`background-color: ${route.color}`"
                tile>
                {{ route.grade }}
              </v-chip>
              &nbsp;
              <span
                v-if="showLocation"
                :to="{ name: 'location', params: { location: route.location }}"
                class="overline text--primary">
                {{ getLocationById(route.location).name }}
              </span>

              <v-tooltip
                v-for="id in route.tags"
                :key="route.id + id"
                :open-delay="500"
                bottom>
                <template #activator="{ on }">
                  <router-link
                    :aria-label="$t('tags.ariaView', { tag: tagName(tag) })"
                    :to="{ name: 'tag', params: { tag: id }}">
                    <v-icon
                      :color="tag(id).color"
                      v-on="on">
                      mdi-circle
                    </v-icon>
                  </router-link>
                </template>
                <span>{{ tagName(tag(id)) }}</span>
              </v-tooltip>
            </v-list-item-title>
            <v-list-item-subtitle>
              <span class="text--primary">{{ route.goal ? `${$t('routes.view.goal')} ${dateToText(route.goal)}` : $t('routes.view.noGoal') }}</span>
              <template v-if="route.name !== ''">
                &mdash; {{ route.name }}
              </template>
            </v-list-item-subtitle>
          </router-link>
        </v-list-item-content>
        <v-list-item-action>
          <v-menu>
            <template #activator="{ on: menu }">
              <v-tooltip
                open-delay="500"
                bottom>
                <template #activator="{ on: tooltip }">
                  <v-btn
                    :aria-label="$t('routes.helps.moreActions', { grade: route.grade, name: route.name === '' ? '' : `(${route.name})`, location: getLocationById(route.location).name })"
                    :ripple="false"
                    icon
                    v-on="{ ...menu, ...tooltip }">
                    <v-icon color="action-text">mdi-dots-horizontal</v-icon>
                  </v-btn>
                </template>
                <span>{{ $t('terms.actions.more') }}</span>
              </v-tooltip>
            </template>
            <v-card
              class="sheet-background"
              style="border-radius: 12px">
              <list-group>
                <card
                  icon="mdi-delete-outline"
                  top
                  bottom
                  @click="remove(route.id)">
                  <template #title>{{ $t('routes.actions.remove') }}</template>
                </card>
              </list-group>
            </v-card>
          </v-menu>
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
import tagName from '@/utils/tags'

export default {
  name: 'RoutesList',
  props: {
    background: Boolean,
    paddingless: Boolean,
    routes: {
      type: Array,
      required: true
    },
    showLocation: Boolean
  },
  data() {
    return {
      icons: routeIcons,
      routeToRemove: '',
      removePopup: false
    }
  },
  computed: {
    ...mapState(['assets', 'locations']),
    ...mapGetters(['getLocationById', 'getTagById'])
  },
  methods: {
    ...mapActions(['switchFinishedRoute', 'removeRoute']),
    getRouteThumbnail, tagName,
    remove(id) {
      this.routeToRemove = id
      this.removePopup = true
    },
    confirmRemove() {
      this.removeRoute(this.routeToRemove)
      this.removePopup = false
    },
    tag(id) {
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
