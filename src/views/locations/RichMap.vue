<template>
  <l-map
    v-if="showMap"
    :zoom="15"
    :center="[mapInfo['y'], mapInfo['x']]">
    <l-tile-layer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"/>
    <l-marker
      :lat-lng="[parseFloat(mapInfo['y']), parseFloat(mapInfo['x'])]"
      visible>
      <l-icon
        :icon-size="iconSize"
        :icon-anchor="iconAnchor"
        :shadow-size="iconSize"
        :shadow-anchor="[ iconAnchor[0] - 1.5, iconAnchor[1] - 1.5 ]"
        icon-url="/img/defaults/map-marker.png"
        shadow-url="/img/defaults/map-marker-shadow.png"/>
    </l-marker>
  </l-map>
</template>

<script>
import { latLng } from 'leaflet'
import { LMap, LTileLayer, LMarker, LIcon } from 'vue2-leaflet'
import { OpenStreetMapProvider } from 'leaflet-geosearch'

const provider = new OpenStreetMapProvider()

export default {
  model: { prop: 'location' },
  props: {
    location: {
      type: String,
      required: true
    }
  },
  components: { LMap, LTileLayer, LMarker, LIcon },
  data() {
    return {
      mapInfo: {},
      showMap: false,
      staticIconSize: 45
    }
  },
  mounted() {
    this.updateMap(this.location)
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
    latLng,
    async updateMap(location) {
      provider.search({ query: location }).then(response => {
        this.mapInfo = response[0]
        this.showMap = true
      })
    }
  },
  watch: {
    location(location) {
      this.updateMap(location)
    }
  }
}
</script>
