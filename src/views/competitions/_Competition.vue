<template>
  <v-content>
    <v-dialog
      v-model="deleteDialog"
      max-width="290"
      persistent>
      <v-card>
        <v-card-title class="headline">{{ $t('terms.actionConfirmation') }}</v-card-title>
        <v-card-text>{{ $t('competitions.deleteConfirmation') }}</v-card-text>
        <v-card-actions>
          <v-btn
            text
            @click="deleteDialog = false">
            {{ $t('terms.cancel') }}
          </v-btn>
          <v-spacer/>
          <v-btn
            color="error"
            text
            @click="deleteThis">
            {{ $t('terms.delete') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <template v-if="editMode">
      <app-bar
        :title="$t('competitions.edit')"
        small-only>
        <template #bar-left-actions>
          <a @click="resetEdit()">{{ $t('terms.cancel') }}</a>
        </template>
        <template #bar-right-actions>
          <a @click="validateEdit">{{ $t('terms.ok') }}</a>
        </template>
      </app-bar>
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="6"/>
          <v-col
            cols="12"
            md="6">
            <competition-form v-model="form"/>
            <div class="mt-4">
              <list-group>
                <card top>
                  <template #title>
                    <span class="primary--text">{{ $t('competitions.transfer')}}</span>
                  </template>
                </card>
                <card
                  bottom
                  @click="deleteDialog = true">
                  <template #title>
                    <span class="error--text">{{ $t('competitions.delete') }}</span>
                  </template>
                </card>
              </list-group>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </template>
    <template v-else>
      <app-bar
        :title="competition.name"
        small-only>
        <template #bar-left-actions>
          <a @click="$router.back()">{{ $t('terms.back') }}</a>
        </template>
        <template #bar-right-actions>
          <a @click="editMode = true">{{ $t('terms.edit') }}</a>
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
              <template v-if="location.type === 'location'">{{ location.name }} &mdash;</template>
              {{ location.address }}
            </span>
            <p>{{ competition.description }}</p>
            <span class="primary--text">{{ dateToText(competition.date) }}</span>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-content>
</template>

<script>
import { latLng } from 'leaflet'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
import { OpenStreetMapProvider } from 'leaflet-geosearch'
import { mapGetters, mapActions } from 'vuex'
import CompetitionForm from '@/views/competitions/CompetitionForm'

const provider = new OpenStreetMapProvider()

export default {
  name: 'Competition',
  components: { LMap, LTileLayer, LMarker, CompetitionForm },
  data () {
    return {
      form: {},

      editMode: false,
      deleteDialog: false,

      showMap: false,
      mapInfo: {}
    }
  },
  mounted() {
    this.resetEdit()
  },
  computed: {
    ...mapGetters(['getCompetitionById', 'getLocationById']),
    competition() {
      return this.getCompetitionById(this.$route.params.competition)
    },
    location() {
      let location = {
        type: this.competition.location.type
      }
      let query = ''

      if (location.type === 'string') {
        location = {
          type: 'string',
          address: this.competition.location.address
        }
        query = location.address
      } else if (location.type === 'location') {
        location = {
          ...location,
          ...this.getLocationById(this.competition.location.locationID)
        }
        query = location.address
      } else {
        // TODO : error handling
      }
      provider.search({ query }).then(response => {
        this.mapInfo = response[0]
        this.showMap = true
      })
      return location
    }
  },
  methods: {
    ...mapActions(['updateCompetition', 'deleteCompetition']),
    latLng,
    resetEdit() {
      this.form = Object.assign({}, this.competition)
      this.editMode = false
    },
    validateEdit() {
      this.updateCompetition(this.form)
      this.resetEdit()
    },
    deleteThis() {
      this.deleteCompetition(this.competition.id)
      this.$router.push({ name: 'competitions' })
    }
  }
}
</script>
