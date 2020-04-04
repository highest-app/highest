<template>
  <v-content>
    <v-dialog
      v-model="deleteDialog"
      max-width="290"
      persistent>
      <v-card>
        <v-card-title class="headline">{{ $t('terms.actionConfirmation') }}</v-card-title>
        <v-card-text>{{ $t('locations.deleteConfirmation') }}</v-card-text>
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
    <app-bar
      small-only>
      <template #bar-left-actions>
        <a
          class="hidden-md-and-up"
          @click="$router.back()">
          {{ $t('terms.back') }}
        </a>
      </template>
    </app-bar>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="3">
          <v-carousel
            :continuous="false"
            height="auto"
            hide-delimiters>
            <v-carousel-item
              v-for="photo in location.photos"
              :key="photo">
              <v-img
                :aspect-ratio="16/9"
                :src="photo"/>
            </v-carousel-item>
          </v-carousel>
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
                class="mr-3"
                color="primary"
                depressed
                @click="editLocation">
                <v-icon left>mdi-pencil-outline</v-icon>
                {{ $t('terms.edit') }}
              </v-btn>
              <v-btn
                color="error"
                depressed
                @click="deleteDialog = true">
                <v-icon left>mdi-delete-outline</v-icon>
                {{ $t('terms.delete') }}
              </v-btn>
            </v-col>
            <v-col cols="12">
              <routes-list
                :routes="routes"
                flat/>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import RoutesList from '@/views/parts/RoutesList'

export default {
  name: 'Location',
  components: { RoutesList },
  data: () => ({
    location: {},
    routes: [],

    deleteDialog: false
  }),
  mounted () {
    this.refreshRoutes()
  },
  computed: {
    ...mapGetters(['getLocationById', 'getRoutesByLocation'])
  },
  methods: {
    ...mapActions(['deleteLocation']),
    refreshRoutes () {
      const id = this.$route.params.location
      this.location = this.getLocationById(id)
      if (this.location === undefined) this.$router.push('/routes')
      else this.routes = this.getRoutesByLocation(this.location.id)
    },
    editLocation () {

    },
    deleteThis () {
      this.deleteLocation(this.location.id)
      this.$router.push({ name: 'routes' })
    }
  }
}
</script>
