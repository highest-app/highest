<template>
  <v-main>
    <app-bar small-only>
      <template #bar-left-actions>
        <app-link @click="$router.back()">{{ $t('terms.actions.back') }}</app-link>
      </template>
      <template #bar-right-actions>
        <route-edit
          v-model="editMode"
          :route="route">
          <template #activator="{ on }">
            <app-link v-on="on">{{ $t('terms.actions.edit') }}</app-link>
          </template>
        </route-edit>
      </template>
    </app-bar>
    <v-container>
      <v-row>
        <v-col
          order="2"
          order-md="1"
          cols="12"
          md="6">
          <v-row>
            <v-col cols="12">
              <zoomable-image
                v-if="route.photos.length === 0"
                :src="getLocationThumbnail(location)"/>
              <template v-else>
                <v-window
                  v-model="imageIndex"
                  height="auto">
                  <v-window-item
                    v-for="(image, index) in route.photos"
                    :key="image">
                    <zoomable-image
                      :src="assets[image]"
                      :alt="$t('assets.help.viewIndex', { index })">
                      <v-row
                        v-if="route.photos.length > 1"
                        align="center"
                        class="ma-0"
                        style="min-height: 100%">
                        <v-btn
                          :aria-label="$t('assets.carousel.previous')"
                          icon
                          @click="previousImage">
                          <v-icon large>mdi-chevron-left</v-icon>
                        </v-btn>
                        <v-spacer/>
                        <v-btn
                          :aria-label="$t('assets.carousel.next')"
                          icon
                          @click="nextImage">
                          <v-icon large>mdi-chevron-right</v-icon>
                        </v-btn>
                      </v-row>
                    </zoomable-image>
                  </v-window-item>
                </v-window>
              </template>
            </v-col>
            <v-col
              style="height: 500px"
              cols="12">
              <rich-map v-model="location.address"/>
            </v-col>
          </v-row>
        </v-col>
        <v-col
          order="1"
          order-md="2"
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
              :aria-label="$t('tags.ariaView', { tag: tagName(tag) })"
              class="mr-2"
              outlined>
              <v-icon
                :color="tag.color"
                left>mdi-circle</v-icon>
              {{ tagName(tag) }}
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
                      <v-tooltip
                        bottom
                        open-delay="500">
                        <template #activator="{ on }">
                          <v-btn
                            :aria-label="$t('routes.actions.ariaRemoveProgression', { date: dateToText(progression.date), notes: progression.notes })"
                            icon
                            v-on="on"
                            @click="removeProgression({
                              route: route.id,
                              progression: progression.id
                            })">
                            <v-icon color="red darken-4">mdi-delete-outline</v-icon>
                          </v-btn>
                        </template>
                        <span>{{ $t('routes.actions.removeProgression') }}</span>
                      </v-tooltip>
                    </v-col>
                  </v-row>
                </v-timeline-item>
              </v-timeline>
              <card-group>
                <card
                  aria-haspopup="true"
                  icon="mdi-clock-outline"
                  icon-color="red"
                  top
                  :bottom="!progressionCard"
                  @click="progressionCard = !progressionCard">
                  <template #title>
                    <span>{{ $t('routes.actions.addProgress') }}</span>
                    <template v-if="progressionCard">
                      <br><span class="font-weight-light primary--text">{{ dateToText(progressionForm.date) }}</span>
                    </template>
                  </template>
                  <template #action>
                    <v-icon color="primary">
                      mdi-chevron-right <template v-if="progressionCard">mdi-rotate-90</template>
                    </v-icon>
                  </template>
                </card>
                <v-slide-y-transition>
                  <template v-if="progressionCard">
                    <div>
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
                    </div>
                  </template>
                </v-slide-y-transition>
              </card-group>
            </v-col>
            <v-col cols="12">
              <card-header>{{ $t('terms.actions.share') }}</card-header>
              <card-group>
                <responsive-dialog v-model="qrCodeDialog">
                  <template #activator="{ on }">
                    <card
                      icon="mdi-qrcode-plus"
                      icon-color="blue"
                      top
                      bottom
                      chevron
                      @click="generateQrCode"
                      v-on="on">
                      <template #title>{{ $t('qr.generate.title') }}</template>
                    </card>
                  </template>
                  <template #dialog>
                    <app-bar
                      :title="$t('qr.generate.generated')"
                      small-only
                      fixed>
                      <template #bar-right-actions>
                        <app-link @click="qrCodeDialog = false">OK</app-link>
                      </template>
                    </app-bar>
                    <page-body style="display: flex; flex-direction: column">
                      <p>{{ $t('qr.generate.advice') }}</p>
                      <img
                        :src="qrCode"
                        alt="QR Code"
                        style="max-width: 90%; align-self: center">
                      <div class="px-3 pt-2">
                        <v-icon left>
                          mdi-lightbulb-outline
                        </v-icon>
                        {{ $t('qr.generate.tip') }}
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
  </v-main>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import { getRouteThumbnail, getLocationThumbnail } from '@/utils/assets'
import { defaultProgressionForm } from '@/utils/forms'
import { generateQrCode, encodeData } from '@/utils/qrcode'
import { download } from '@/utils/storage'
import tagName from '@/utils/tags'

import RichMap from '@/views/locations/RichMap'
import RouteEdit from '@/views/routes/RouteEdit'

export default {
  name: 'Route',
  components: { RichMap, RouteEdit },
  data() {
    return {
      editMode: false,
      progressionCard: false,

      imageIndex: 0,

      qrCode: '',
      qrCodeDialog: false,

      progressionForm: Object.assign({}, defaultProgressionForm),
    }
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
    }
  },
  methods: {
    ...mapActions(['switchFinishedRoute', 'addProgression', 'removeProgression']),
    download,
    getRouteThumbnail, getLocationThumbnail,
    tagName,
    nextImage() {
      this.imageIndex += 1
      if (this.imageIndex === this.route.photos.length) this.imageIndex = 0
    },
    previousImage() {
      this.imageIndex -= 1
      if (this.imageIndex === -1) this.imageIndex = this.route.photos.length - 1
    },
    generateQrCode() {
      if (this.qrCode !== '') return
      let encodedRoute = encodeData('route', { route: this.route, location: this.location })
      generateQrCode(encodedRoute).then(url => this.qrCode = url)
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
    }
  }
}
</script>
