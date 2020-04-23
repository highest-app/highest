<template>
  <v-content>
    <v-dialog
      v-model="deleteDialog"
      max-width="290"
      persistent>
      <v-card>
        <v-card-title class="headline">{{ $t('terms.actionConfirmation') }}</v-card-title>
        <v-card-text>{{ $t('routes.deleteConfirmation') }}</v-card-text>
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
        :title="$t('routes.edit')"
        small-only>
        <template #bar-left-actions>
          <a @click="quitEdit">{{ $t('terms.cancel') }}</a>
        </template>
        <template #bar-right-actions>
          <a @click="validateEdit">{{ $t('terms.ok') }}</a>
        </template>
      </app-bar>
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="6">
            <asset-uploader
              v-model="routeForm.photos"
              :active="photoChoose"
              title="locations.editAssets"
              multiple>
              <template #activator="{ on }">
                <v-card v-on="on">
                  <v-img :src="getRouteThumbnail(route)">
                    <v-row
                      style="flex-direction: column"
                      class="fill-height blurred"
                      align="center"
                      justify="center">
                      <v-icon size="70">mdi-image-edit-outline</v-icon>
                      <span class="headline">{{ $t('assets.edit') }}</span>
                    </v-row>
                  </v-img>
                </v-card>
              </template>
            </asset-uploader>
          </v-col>
          <v-col
            cols="12"
            md="6">
            <route-form v-model="routeForm"/>
            <div class="mt-4">
              <list-group>
                <card top>
                  <template #title>
                    <span class="primary--text">{{ $t('routes.transfer')}}</span>
                  </template>
                </card>
                <card
                  bottom
                  @click="deleteDialog = true">
                  <template #title>
                    <span class="error--text">{{ $t('routes.delete') }}</span>
                  </template>
                </card>
              </list-group>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </template>
    <template v-else>
      <app-bar small-only>
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
            cols="12"
            md="6">
            <v-carousel
              v-if="route.photos.length"
              :continuous="false"
              height="auto"
              hide-delimiters>
              <v-carousel-item
                v-for="photo in route.photos"
                :key="photo">
                <v-img :src="assets[photo]"/>
              </v-carousel-item>
            </v-carousel>
            <v-img
              v-else
              :src="getLocationThumbnail(location)"/>
          </v-col>
          <v-col
            cols="12"
            md="6">
            <h1>{{ route.name }}</h1>
            <span class="overline list-description--text">
              <v-icon color="list-description">mdi-map-marker-outline</v-icon>
              {{ location.name }} &mdash; {{ location.address }}
            </span>
            <v-row>
              <v-col cols="12">
                <card-header>{{ $t('routes.information') }}</card-header>
                <p>{{ route.notes }}</p>
                <p>
                  <strong>{{ $t('terms.length') }} : </strong>{{ route.length }}m
                </p>
                <v-switch
                  v-model="route.finished"
                  color="primary"
                  :label="$t('routes.markAsFinished')"
                  inset
                  @click.stop="switchFinishedRoute(route.id)"/>
              </v-col>
              <v-col cols="12">
                <card-header>{{ $t('routes.progressions') }}</card-header>
                <v-date-picker
                  v-model="progressionForm.date"
                  :events="progressionDates"
                  :max="today"
                  event-color="secondary"
                  style="box-shadow: 0;"
                  color="primary"
                  no-title
                  full-width/>
              </v-col>
              <v-col cols="12">
                <v-row
                  class="mx-2"
                  align="center">
                  <template v-if="selectedProgress === undefined">
                    <v-text-field
                      v-model="progressionForm.notes"
                      :placeholder="$t('routes.addProgress')"
                      rows="1"
                      auto-grow
                      hide-details
                      solo
                      flat
                      @keydown.enter="progressionAdd"/>
                    <v-btn
                      :disabled="progressionForm.notes === ''"
                      icon
                      @click="progressionAdd">
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </template>
                  <template v-else>
                    <strong>{{ dateToText(selectedProgress.date) }} : </strong>
                    {{ selectedProgress.notes }}
                    <v-spacer/>
                    <v-btn
                      icon
                      @click="removeProgression({
                        route: route.id,
                        notes: selectedProgress.notes
                      })">
                      <v-icon color="red darken-4">mdi-delete-outline</v-icon>
                    </v-btn>
                  </template>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-content>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { defaultProgressionForm } from '@/utils/forms'
import { getRouteThumbnail, getLocationThumbnail } from '@/utils/assets'
import RouteForm from '@/views/routes/RouteForm'

export default {
  name: 'Route',
  components: { RouteForm },
  data() {
    return {
      route: {},
      location: {},

      editMode: false,
      photoChoose: false,
      deleteDialog: false,

      progressionForm: Object.assign({}, defaultProgressionForm),
      routeForm: {}
    }
  },
  mounted () {
    this.route = this.getRoute(this.$route.params.location, this.$route.params.route)
    if (this.route === undefined) {
      this.$router.back()
    }
    this.location = this.getLocationById(this.route.location)
    this.quitEdit()
  },
  computed: {
    ...mapState(['assets']),
    ...mapGetters(['getRoute', 'getLocationById']),
    progressionDates () {
      let dates = []
      this.route.progressions.forEach((progress) => {
        dates.push(progress.date)
      })
      return dates
    },
    selectedProgress () {
      let progression = this.route.progressions.find(progress => progress.date === this.progressionForm.date)
      if (progression === null) {
        return undefined
      }
      return progression
    }
  },
  methods: {
    ...mapActions(['updateRoute', 'deleteRoute', 'switchFinishedRoute', 'addProgression', 'removeProgression']),
    getRouteThumbnail, getLocationThumbnail,
    deleteThis () {
      this.deleteRoute(this.route.id)
      this.$router.back()
    },
    validateEdit () {
      this.updateRoute(this.routeForm)
      this.quitEdit()
    },
    quitEdit() {
      this.routeForm = Object.assign({}, this.route)
      this.editMode = false
    },
    progressionAdd () {
      this.addProgression({
        id: this.route.id,
        date: this.progressionForm.date,
        notes: this.progressionForm.notes
      })
      this.progressionForm.notes = ''
    }
  }
}
</script>
