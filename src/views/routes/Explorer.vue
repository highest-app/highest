<template>
  <responsive-dialog
    v-model="active"
    fullscreen
    persistent>
    <template #activator="{ on }">
      <card
        icon="mdi-map-search-outline"
        icon-color="gradient--primary"
        bottom
        chevron
        v-on="on">
        <template #title>Explore public locations</template>
      </card>
    </template>
    <template #dialog>
      <app-bar
        title="Explore public routes"
        small-only
        fixed>
        <template #bar-left-actions>
          <app-link @click="reset">{{ $t('terms.actions.close') }}</app-link>
        </template>
      </app-bar>
      <page-body>
        <v-slider
          v-model="radius"
          label="Radius"
          :min="1"
          :max="100"
          hide-details
          @mouseup="updateRoutes"/>
        <span class="subtitle-1">{{ radius }}km</span>
        <div style="height: 500px; width: 80%">
          <l-map
            v-if="showMap"
            :center="center"
            :zoom="zoom"
            @update:zoom="zoomUpdated"
            @update:center="centerUpdated">
            <l-tile-layer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"/>
            <l-circle
              :lat-lng="center"
              :radius="radius * 1000"
              color="#EFA65E"
              fill-color="#EFA65E"/>
            <l-marker
              v-for="route in routes"
              :key="route.name"
              :lat-lng="[route.lat, route.lng]"
              visible>
              <l-icon
                :icon-size="iconSize"
                :icon-anchor="iconAnchor"
                :shadow-size="iconSize"
                :shadow-anchor="[ iconAnchor[0] - 1.5, iconAnchor[1] - 1.5 ]"
                icon-url="/img/defaults/map-marker.png"
                shadow-url="/img/defaults/map-marker-shadow.png"/>
              <l-tooltip>{{ route.label }}, {{ route.city }}, {{ route.region }}</l-tooltip>
              <l-popup>
                <v-row>
                  <v-col
                    cols="12"
                    class="text--primary">
                    {{ route.label }}
                  </v-col>
                  <v-col cols="12">
                    <app-link
                      @click="load(route)">
                      {{ $t('terms.actions.load') }}
                    </app-link>
                  </v-col>
                </v-row>
              </l-popup>
            </l-marker>
            <v-btn>yes</v-btn>
          </l-map>
        </div>
        <v-progress-linear
          v-if="loading"
          indeterminate/>
      </page-body>
    </template>
  </responsive-dialog>
</template>

<script>
import { LMap, LTileLayer, LCircle, LMarker, LIcon, LTooltip, LPopup } from 'vue2-leaflet'

export default {
  name: 'Explorer',
  components: { LMap, LTileLayer, LCircle, LMarker, LIcon, LTooltip, LPopup },
  data() {
    return {
      center: {
        lat: 47.413220,
        lng: -1.219482
      },
      zoom: 7,
      radius: 10,

      loading: false,
      routes: [],

      active: false,
      showMap: false,

      staticIconSize: 30
    }
  },
  computed: {
    iconSize() {
      return [this.staticIconSize, this.staticIconSize * 1.15];
    },
    iconAnchor() {
      return [this.staticIconSize / 2, this.staticIconSize * 1.15];
    }
  },
  methods: {
    zoomUpdated(zoom) {
      this.zoom = zoom
    },
    centerUpdated(center) {
      this.center = center
    },
    reset() {
      this.center = [47.413220, -1.219482]
      this.radius = 10

      this.active = false
    },
    updateRoutes() {
      this.loading = true
      this.$http.get(`https://cors-anywhere.herokuapp.com/https://oblyk.org/api/v1/crags/around-place/${this.center.lat}/${this.center.lng}/${this.radius}`, { headers: { Accept: 'application/json' }})
        .then(data => {
          this.routes = data.body.data.crags
          this.loading = false
        }, err => console.error(err))
    },
    load(_, route) {
      this.$emit('return', {
        name: route.label,
        address: `${route.city}, ${route.region}, ${route.code_country.toUpperCase()}`,
        notes: route.url
      })
      this.active = false
    }
  },
  watch: {
    active() {
      // TODO: find a way to properly load the map without this annoying timer
      setTimeout(() => this.showMap = true, 500)
    }
  }
}
</script>

<style lang="stylus">
.leaflet-popup-content-wrapper
.leaflet-popup-tip
  background-color: var(--v-sheets-base) !important

.leaflet-popup-close-button
  color: var(--v-action-icon-base)
</style>
