<template>
  <v-main>
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
              <card-group>
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
              </card-group>
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
            <v-row>
              <v-col cols="12">
                <v-carousel
                  v-if="route.photos !== undefined && route.photos.length"
                  :continuous="false"
                  height="auto"
                  hide-delimiters>
                  <v-carousel-item
                    v-for="photo in route.photos"
                    :key="photo">
                    <zoomable-image :src="assets[photo]"/>
                  </v-carousel-item>
                </v-carousel>
                <zoomable-image
                  v-else
                  :src="getLocationThumbnail(location)"/>
              </v-col>
              <v-col
                style="height: 500px"
                cols="12">
                <rich-map v-model="location.address"/>
              </v-col>
            </v-row>
          </v-col>
          <v-col
            cols="12"
            md="6">
            <h1>{{ route.name }}</h1>
            <span class="overline list-description--text">
              <v-icon color="list-description">mdi-map-marker-outline</v-icon>
              {{ location.name }} &mdash; {{ location.address }}
            </span>
            <v-row class="mx-0 mt-1">
              <v-chip
                v-for="tag in tags"
                :key="tag.id"
                :to="{ name: 'tag', params: { tag: tag.id } }"
                class="mr-2"
                outlined>
                <v-icon
                  :color="tag.color"
                  left>mdi-circle</v-icon>
                {{ tag.name }}
              </v-chip>
            </v-row>
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
                <v-timeline
                  v-if="route.progressions.length"
                  align-top
                  dense>
                  <v-timeline-item
                    v-for="progression in route.progressions.slice().reverse()"
                    :key="progression.notes"
                    color="secondary"
                    small>
                    <v-row>
                      <v-col class="flex-grow-1 pa-0">
                        <strong>{{ progression.notes }}</strong>
                        <div class="caption">{{ dateToText(progression.date) }}</div>
                      </v-col>
                      <v-col class="flex-grow-0 py-0">
                        <v-btn
                          :aria-label="$t('routes.actions.removeProgression', { notes: progression.notes })"
                          icon
                          @click="removeProgression({
                            route: route.id,
                            progression: progression.id
                          })">
                          <v-icon color="red darken-4">mdi-delete-outline</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-timeline-item>
                </v-timeline>
                <card-group>
                  <card
                    icon="mdi-clock-outline"
                    icon-color="red"
                    top
                    :bottom="!progressionCard">
                    <template #title>
                      <span>{{ $t('routes.actions.addProgress') }}</span>
                      <template v-if="progressionCard">
                        <br><span class="font-weight-light primary--text">{{ dateToText(progressionForm.date) }}</span>
                      </template>
                    </template>
                    <template #action>
                      <v-btn
                        icon
                        @click="progressionCard = !progressionCard">
                        <v-icon>
                          {{ progressionCard ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                        </v-icon>
                      </v-btn>
                    </template>
                  </card>
                  <template v-if="progressionCard">
                    <card>
                      <template #title>
                        <v-date-picker
                          v-model="progressionForm.date"
                          :events="progressionDates"
                          :max="today"
                          event-color="secondary"
                          style="box-shadow: 0"
                          color="primary"
                          no-title
                          full-width/>
                      </template>
                    </card>
                    <card bottom>
                      <template #input>
                        <v-text-field
                          v-model="progressionForm.notes"
                          :placeholder="$t('terms.fields.notes')"
                          hide-details
                          solo
                          flat
                          @keydown.enter="progressionAdd"/>
                      </template>
                      <template #action>
                        <v-btn
                          :aria-label="$t('routes.actions.addProgress')"
                          :disabled="progressionForm.notes === ''"
                          icon
                          @click="progressionAdd">
                          <v-icon>mdi-plus</v-icon>
                        </v-btn>
                      </template>
                    </card>
                  </template>
                </card-group>
              </v-col>
              <v-col cols="12">
                <card-header>Share</card-header>
                <card-group>
                  <responsive-dialog v-model="qrCodeDialog">
                    <template #activator="{ on }">
                      <card
                        icon="mdi-qrcode-plus"
                        icon-color="blue"
                        top
                        bottom
                        @click="generateQrCode"
                        v-on="on">
                        <template #title>Generate QR Code</template>
                        <template #action>
                          <v-icon>mdi-chevron-right</v-icon>
                        </template>
                      </card>
                    </template>
                    <template #dialog>
                      <app-bar
                        title="Generated QR Code"
                        small-only
                        fixed>
                        <template #bar-right-actions>
                          <app-link @click="qrCodeDialog = false">OK</app-link>
                        </template>
                      </app-bar>
                      <page-body style="display: flex; flex-direction: column">
                        <p>This is the generated QR Code for your route. Every device that has a camera and QR Code scanning capabilities can go on Highest and download the route on the app.</p>
                        <img
                          :src="qrCode"
                          alt="QR Code"
                          style="max-width: 90%; align-self: center">
                        <div class="px-3 pt-2">
                          <v-icon left>
                            mdi-lightbulb-outline
                          </v-icon>
                          Tip: you can save the QR Code as an image to print it everywhere you want!
                        </div>
                      </page-body>
                    </template>
                  </responsive-dialog>
                </card-group>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-main>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import { getRouteThumbnail, getLocationThumbnail } from '@/utils/assets'
import { defaultProgressionForm } from '@/utils/forms'
import { generateQrCode, encodeData } from '@/utils/qrcode'
import { download } from '@/utils/storage'

import RichMap from '@/views/locations/RichMap'
import RouteForm from '@/views/routes/RouteForm'

export default {
  name: 'Route',
  components: { RichMap, RouteForm },
  data() {
    return {
      editMode: false,
      photoChoose: false,
      transferDialog: false,
      removeDialog: false,
      progressionCard: false,

      qrCode: '',
      qrCodeDialog: false,

      progressionForm: Object.assign({}, defaultProgressionForm),
      routeForm: {}
    }
  },
  mounted () {
    this.quitEdit()
  },
  computed: {
    ...mapState(['assets', 'locations']),
    ...mapGetters(['getRoute', 'getLocationById', 'getTagById']),
    route() {
      let route = this.getRoute(this.$route.params.location, this.$route.params.route)
      if (route === undefined) {
        this.$router.back()
      }
      return route
    },
    location() {
      return this.getLocationById(this.route.location)
    },
    tags() {
      return this.route.tags.map(tag => {
        tag = this.getTagById(tag)
        if (tag.default) tag.name = this.$t(`terms.colors.${tag.color}`)
        return tag
      })
    },
    progressionDates() {
      return this.route.progressions.map(progress => progress.date)
    },
    selectedProgressions() {
      return this.route.progressions.filter(progress => progress.date === this.progressionForm.date)
    },
    transferableLocations() {
      return this.locations.filter(location => location.id !== this.route.location)
    },
  },
  methods: {
    ...mapActions(['updateRoute', 'transferRoute', 'removeRoute', 'switchFinishedRoute', 'addProgression', 'removeProgression']),
    download,
    getRouteThumbnail, getLocationThumbnail,
    generateQrCode() {
      if (this.qrCode !== '') return
      let encodedRoute = encodeData('route', { route: this.route, location: this.location })
      generateQrCode(encodedRoute).then(url => this.qrCode = url)
    },
    validateEdit() {
      this.updateRoute(this.routeForm)
      this.quitEdit()
    },
    quitEdit() {
      this.routeForm = Object.assign({
        enableGoal: this.route.goal !== false
      }, this.route)
      this.editMode = false
    },
    progressionAdd() {
      if (this.progressionForm.notes !== '') {
        this.addProgression({
          id: this.route.id,
          date: this.progressionForm.date,
          notes: this.progressionForm.notes
        })
        this.progressionForm.notes = ''
      }
    },
    remove() {
      this.removeRoute(this.route.id)
      this.$router.back()
    }
  }
}
</script>
