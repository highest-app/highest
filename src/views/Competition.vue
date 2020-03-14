<template>
  <v-content>
    <app-bar
      :title="competition.name"
      small-only>
      <template #bar-left-actions>
        <a @click="$router.back()">{{ $t('terms.back') }}</a>
      </template>
      <template #bar-right-actions>
        <a>{{ $t('terms.edit') }}</a>
      </template>
    </app-bar>
    <v-container>
      <v-row>
        <v-col
          style="height: 500px"
          cols="12"
          md="6">
          <l-map
            v-if="showMap"
            :zoom="15"
            :center="[mapInfo['y'], mapInfo['x']]">
            <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            <l-marker :lat-lng="latLng(mapInfo['y'], mapInfo['x'])"/>
          </l-map>
        </v-col>
        <v-col
          cols="12"
          md="6">
          <h1>{{ competition.name }}</h1>
          <p>{{ competition.description }}</p>
          <span class="primary--text">{{ dateToText(competition.date) }}</span>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import { latLng } from 'leaflet'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
import { OpenStreetMapProvider } from 'leaflet-geosearch'
import { mapGetters } from 'vuex'
import { dateToText } from '@/utils/parsing'

const provider = new OpenStreetMapProvider()

export default {
  name: 'Competition',
  components: { LMap, LTileLayer, LMarker },
  data () {
    return {
      competition: {},
      location: {},

      showMap: false,
      mapInfo: {}
    }
  },
  mounted () {
    this.competition = this.getCompetitionById(this.$route.params.competition)
    if (this.competition.location.type === 'string') {
      this.location = {
        type: 'external',
        name: this.competition.location.value,
        link: new URL(`https://www.openstreetmap.org/search?query=${this.competition.location.value}`)
      }
      provider.search({ query: this.competition.location.value }).then(response => {
        this.mapInfo = response[0]
        this.showMap = true
      })
    } else if (this.competition.location.type === 'location') {
      const internalLocation = this.getLocationById(this.competition.location.value)
      this.location = {
        type: 'internal',
        name: internalLocation.name,
        link: `/locations/${internalLocation.id}`
      }
    }
  },
  computed: {
    ...mapGetters(['getCompetitionById', 'getLocationById'])
  },
  methods: {
    latLng,
    dateToText
  }
}
</script>
