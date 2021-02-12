<template>
  <v-main v-if="location !== undefined">
    <app-bar
      :title="location.name"
      title-align="end">
      <template #title-append>
        <span class="list-description--text overline mr-6">
          {{ location.address }}
        </span>
      </template>
      <template #top-bar-actions>
        <route-adding :location="location.id"/>
      </template>
      <template #bar-left-actions>
        <app-link
          class="hidden-md-and-up"
          @click="$router.back()">
          {{ $t('terms.actions.back') }}
        </app-link>
      </template>
      <template
        #bar-right-actions>
        <location-edit
          v-model="editDialog"
          :location="location">
          <template #activator="{ on }">
            <app-link v-on="on">{{ $t('terms.actions.edit') }}</app-link>
          </template>
        </location-edit>
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
            <v-col
              cols="12"
              class="pt-0">
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
          <p>{{ location.notes }}</p>
          <routes-list
            :routes="routes"
            background/>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { getLocationThumbnail } from '@/utils/assets'
import LocationEdit from '@/views/locations/LocationEdit'
import RichMap from '@/views/locations/RichMap'
import RouteAdding from '@/views/routes/RouteAdding'
import RoutesList from '@/views/routes/RoutesList'

export default {
  name: 'Location',
  components: { LocationEdit, RichMap, RouteAdding, RoutesList },
  data: () => ({
    editDialog: false,

    imageIndex: 0
  }),
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
    getLocationThumbnail,
    nextImage() {
      this.imageIndex += 1
      if (this.imageIndex === this.route.photos.length) this.imageIndex = 0
    },
    previousImage() {
      this.imageIndex -= 1
      if (this.imageIndex === -1) this.imageIndex = this.route.photos.length - 1
    }
  }
}
</script>
