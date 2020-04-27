<template>
  <v-content>
    <v-dialog
      v-model="removeDialog"
      max-width="290"
      persistent>
      <v-card>
        <v-card-title class="headline">{{ $t('terms.actionConfirmation') }}</v-card-title>
        <v-card-text>{{ $t('routes.actions.removeConfirmation') }}</v-card-text>
        <v-card-actions>
          <v-btn
            text
            @click="removeDialog = false">
            {{ $t('terms.actions.cancel') }}
          </v-btn>
          <v-spacer/>
          <v-btn
            color="error"
            text
            @click="remove">
            {{ $t('terms.actions.remove') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <template v-if="editMode">
      <app-bar
        :title="$t('routes.actions.edit')"
        small-only>
        <template #bar-left-actions>
          <a @click="quitEdit">{{ $t('terms.actions.cancel') }}</a>
        </template>
        <template #bar-right-actions>
          <a @click="validateEdit">{{ $t('terms.actions.ok') }}</a>
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
              title="routes.actions.editAssets"
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
                <responsive-dialog
                  v-if="transferableLocations.length"
                  v-model="transferDialog">
                  <template #activator="{ on }">
                    <card
                      top
                      v-on="on">
                      <template #title>
                        <span class="primary--text">{{ $t('routes.actions.transfer') }}</span>
                      </template>
                    </card>
                  </template>
                  <template #dialog>
                    <app-bar
                      :title="$t('routes.transfer')"
                      small-only
                      fixed>
                      <template #bar-left-actions>
                        <a @click="transferDialog = false">{{ $t('terms.actions.cancel') }}</a>
                      </template>
                    </app-bar>
                    <page-body>
                      <card
                        v-for="location in transferableLocations"
                        :key="location.id"
                        @click="transferRoute({
                          location: location.id,
                          route: route.id,
                          $router
                        })">
                        <template #title>
                          <v-list-item-avatar>
                            <v-img :src="getLocationThumbnail(location)"/>
                          </v-list-item-avatar>
                          {{ location.name }}
                        </template>
                      </card>
                    </page-body>
                  </template>
                </responsive-dialog>
                <card
                  :top="!transferableLocations.length"
                  bottom
                  @click="removeDialog = true">
                  <template #title>
                    <span class="error--text">{{ $t('routes.actions.remove') }}</span>
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
          <a @click="$router.back()">{{ $t('terms.actions.back') }}</a>
        </template>
        <template #bar-right-actions>
          <a @click="editMode = true">{{ $t('terms.actions.edit') }}</a>
        </template>
      </app-bar>
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="6">
            <v-carousel
              v-if="route.photos !== undefined && route.photos.length"
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
                <card-header>{{ $t('routes.view.information') }}</card-header>
                <p>{{ route.notes }}</p>
                <p>
                  <strong>{{ $t('routes.terms.length') }} : </strong>{{ route.length }}m
                </p>
                <v-switch
                  v-model="route.finished"
                  color="primary"
                  :label="$t('routes.actions.markAsFinished')"
                  inset
                  @click.stop="switchFinishedRoute(route.id)"/>
              </v-col>
              <v-col cols="12">
                <card-header>{{ $t('routes.view.progressions') }}</card-header>
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
                <card-header>{{ dateToText(progressionForm.date) }}</card-header>
                <v-row
                  v-for="progression in selectedProgressions"
                  :key="progression.id"
                  class="mx-0">
                  {{ progression.notes }}
                  <v-spacer/>
                  <v-btn
                    icon
                    @click="removeProgression({
                      route: route.id,
                      progression: progression.id
                    })">
                    <v-icon color="red darken-4">mdi-delete-outline</v-icon>
                  </v-btn>
                </v-row>
                <v-row
                  class="mx-0"
                  align="center">
                  <v-text-field
                    v-model="progressionForm.notes"
                    :placeholder="$t('routes.actions.addProgress')"
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
import ResponsiveDialog from '@/components/components/ResponsiveDialog/ResponsiveDialog'
import AppBar from '@/components/components/AppBar/AppBar'

export default {
  name: 'Route',
  components: { AppBar, ResponsiveDialog, RouteForm },
  data() {
    return {
      route: {},
      location: {},

      editMode: false,
      photoChoose: false,
      transferDialog: false,
      removeDialog: false,

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
    ...mapState(['assets', 'locations']),
    ...mapGetters(['getRoute', 'getLocationById']),
    progressionDates() {
      let dates = []
      this.route.progressions.forEach((progress) => {
        dates.push(progress.date)
      })
      return dates
    },
    selectedProgressions() {
      return this.route.progressions.filter(progress => progress.date === this.progressionForm.date)
    },
    transferableLocations() {
      return this.locations.filter(location => location.id !== this.route.location)
    }
  },
  methods: {
    ...mapActions(['updateRoute', 'transferRoute', 'removeRoute', 'switchFinishedRoute', 'addProgression', 'removeProgression']),
    getRouteThumbnail, getLocationThumbnail,
    validateEdit () {
      this.updateRoute(this.routeForm)
      this.quitEdit()
    },
    quitEdit() {
      this.routeForm = Object.assign({}, this.route)
      this.editMode = false
    },
    progressionAdd() {
      this.addProgression({
        id: this.route.id,
        date: this.progressionForm.date,
        notes: this.progressionForm.notes
      })
      this.progressionForm.notes = ''
    },
    remove() {
      this.removeRoute(this.route.id)
      this.$router.back()
    },
  }
}
</script>
