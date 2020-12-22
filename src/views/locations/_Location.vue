<template>
  <v-main v-if="location !== undefined">
    <popup
      v-model="removePopup"
      right-text="terms.actions.remove"
      critical
      @right-action="remove">
      <template #description>{{ $t('locations.actions.removeConfirmation') }}</template>
    </popup>
    <template v-if="editMode">
      <app-bar
        :title="$t('locations.actions.edit')"
        small-only>
        <template #bar-left-actions>
          <app-link @click="quitEdit">{{ $t('terms.actions.cancel') }}</app-link>
        </template>
        <template #bar-right-actions>
          <app-link @click="validateEdit">{{ $t('terms.actions.ok') }}</app-link>
        </template>
      </app-bar>
      <v-container>
        <v-row>
          <v-col
            order="2"
            order-md="1"
            cols="12"
            md="4">
            <asset-uploader
              v-model="form.photos"
              :active="photoChoose"
              title="locations.actions.editAssets"
              multiple>
              <template #activator="{ on }">
                <v-card v-on="on">
                  <v-img :src="getLocationThumbnail(location)">
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
            order="1"
            order-md="2"
            cols="12"
            md="8">
            <location-form v-model="form"/>
          </v-col>
        </v-row>
      </v-container>
    </template>
    <template v-else>
      <app-bar small-only>
        <template #bar-left-actions>
          <app-link
            class="hidden-md-and-up"
            @click="$router.back()">
            {{ $t('terms.actions.back') }}
          </app-link>
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
                  v-if="location.photos.length === 0"
                  :src="getLocationThumbnail(location)"/>
                <template v-else>
                  <v-window
                    v-model="imageIndex"
                    height="auto">
                    <v-window-item
                      v-for="(image, index) in location.photos"
                      :key="image">
                      <zoomable-image
                        :src="assets[image]"
                        :alt="$t('assets.help.viewIndex', { index })">
                        <v-row
                          v-if="location.photos.length > 1"
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
            <v-row>
              <v-col cols="12">
                <v-row class="mx-0">
                  <h1>{{ location.name }}</h1>
                  <v-spacer/>
                  <route-adding :location="location.id"/>
                </v-row>
                <span class="overline list-description--text">
                  <v-icon color="list-description">mdi-map-marker-outline</v-icon>
                  {{ location.address }}
                </span>
                <p>{{ location.notes }}</p>
                <v-btn
                  class="mr-3 gradient--primary white--text"
                  depressed
                  @click="editMode = true">
                  <v-icon left>mdi-pencil-outline</v-icon>
                  {{ $t('terms.actions.edit') }}
                </v-btn>
                <v-btn
                  class="gradient--error white--text"
                  depressed
                  @click="removePopup = true">
                  <v-icon left>mdi-delete-outline</v-icon>
                  {{ $t('terms.actions.remove') }}
                </v-btn>
              </v-col>
              <v-col cols="12">
                <routes-list
                  :routes="routes"
                  background/>
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
import { getLocationThumbnail } from '@/utils/assets'
import RichMap from '@/views/locations/RichMap'
import LocationForm from '@/views/locations/LocationForm'
import RoutesList from '@/views/routes/RoutesList'
import RouteAdding from '@/views/routes/RouteAdding'

export default {
  name: 'Location',
  components: { RouteAdding, RichMap, LocationForm, RoutesList },
  data: () => ({
    form: {},

    editMode: false,
    photoChoose: false,
    removePopup: false,

    imageIndex: 0
  }),
  mounted () {
    this.quitEdit()
  },
  computed: {
    ...mapState(['assets']),
    ...mapGetters(['getLocationById', 'getRoutesByLocation']),
    location() {
      const id = this.$route.params.location
      let location = this.getLocationById(id)

      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      if (location === undefined) this.$router.push({ name: 'home' })

      return location
    },
    routes() {
      return this.getRoutesByLocation(this.location.id)
    }
  },
  methods: {
    ...mapActions(['updateLocation', 'removeLocation']),
    getLocationThumbnail,
    nextImage() {
      this.imageIndex += 1
      if (this.imageIndex === this.route.photos.length) this.imageIndex = 0
    },
    previousImage() {
      this.imageIndex -= 1
      if (this.imageIndex === -1) this.imageIndex = this.route.photos.length - 1
    },
    validateEdit() {
      this.updateLocation(this.form)
      this.quitEdit()
    },
    quitEdit() {
      this.form = Object.assign({}, this.location)
      this.editMode = false
    },
    remove() {
      this.removeLocation(this.location.id)
      const nextRoute = this.$vuetify.breakpoint.mdAndUp ? '/routes/all' : '/routes'
      this.$router.push(nextRoute)
    }
  }
}
</script>
