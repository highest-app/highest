<template>
  <v-main v-if="location !== undefined">
    <v-dialog
      v-model="removeDialog"
      max-width="290"
      persistent>
      <v-card>
        <v-card-title class="headline">{{ $t('terms.actionConfirmation') }}</v-card-title>
        <v-card-text>{{ $t('locations.actions.removeConfirmation') }}</v-card-text>
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
        :title="$t('locations.actions.edit')"
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
            md="3">
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
            cols="12"
            md="9">
            <location-form v-model="form"/>
          </v-col>
        </v-row>
      </v-container>
    </template>
    <template v-else>
      <app-bar small-only>
        <template #bar-left-actions>
          <a
            class="hidden-md-and-up"
            @click="$router.back()">
            {{ $t('terms.actions.back') }}
          </a>
        </template>
      </app-bar>
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="3">
            <v-carousel
              v-if="location.photos.length"
              :continuous="false"
              height="auto"
              hide-delimiters>
              <v-carousel-item
                v-for="photo in location.photos"
                :key="photo">
                <v-img
                  :aspect-ratio="16/9"
                  :src="assets[photo]"/>
              </v-carousel-item>
            </v-carousel>
            <v-img
              v-else
              :src="getLocationThumbnail(location)"/>
          </v-col>
          <v-col
            cols="12"
            md="9">
            <v-row>
              <v-col cols="12">
                <h1>{{ location.name }}</h1>
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
                  @click="removeDialog = true">
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
import LocationForm from '@/views/locations/LocationForm'
import RoutesList from '@/views/routes/RoutesList'

export default {
  name: 'Location',
  components: { LocationForm, RoutesList },
  data: () => ({
    form: {},
    editMode: false,
    photoChoose: false,
    removeDialog: false
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
