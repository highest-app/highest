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
          <span class="overline list-description--text">
            <v-icon color="list-description">mdi-map-marker-outline</v-icon>
            <template v-if="competition.location.type === 'location'">{{ competition.location.name }} &mdash;</template>
            {{ competition.location.address }}
          </span>
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

const provider = new OpenStreetMapProvider()

export default {
  name: 'Competition',
  components: { LMap, LTileLayer, LMarker },
  data () {
    return {
      competition: {},

      showMap: false,
      mapInfo: {}
    }
  },
  mounted () {
    this.competition = this.getCompetitionById(this.$route.params.competition)
    let query = ''

    if (this.competition.location.type === 'string') {
      query = this.competition.location.address
    } else if (this.competition.location.type === 'location') {
      this.competition.location = {
        type: this.competition.location.type,
        ...this.getLocationById(this.competition.location.id)
      }
      query = this.competition.location.address
    }
    provider.search({ query }).then(response => {
      this.mapInfo = response[0]
      this.showMap = true
    })
  },
  computed: mapGetters(['getCompetitionById', 'getLocationById']),
  methods: { latLng }
}
</script>
