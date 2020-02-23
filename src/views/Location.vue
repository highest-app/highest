<template>
  <v-content>
    <app-bar
      small-only>
      <template v-slot:bar-left-actions>
        <a
          class="hidden-md-and-up"
          @click="$router.back()">
          {{ $t('terms.return') }}
        </a>
      </template>
    </app-bar>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="6">
          <v-carousel
            v-if="location.photos.length > 1"
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
          md="6">
          <v-row>
            <v-col cols="12">
              <h1>{{ location.name }}</h1>
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
                depressed>
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
import { mapGetters } from 'vuex'

export default {
  name: 'Location',
  data: () => ({
    location: {},
    routes: []
  }),
  mounted () {
    this.refreshRoutes()
  },
  computed: {
    ...mapGetters(['getLocationById', 'getRoutesByLocation'])
  },
  methods: {
    refreshRoutes () {
      const id = this.$route.params.location
      this.location = this.getLocationById(id)
      if (this.location === undefined) this.$router.push('/routes')
      else this.routes = this.getRoutesByLocation(this.location.id)
    },
    editLocation () {

    }
  }
}
</script>
