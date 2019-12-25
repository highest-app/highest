<template>
  <v-content>
    <app-bar
      small-only>
      <template v-slot:bar-left-actions>
        <a
          class="hidden-md-and-up"
          @click="$router.back()">
          Retour
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
                Modifier
              </v-btn>
              <v-btn
                color="error"
                depressed>
                <v-icon left>mdi-delete-outline</v-icon>
                Supprimer
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
import AppBar from '@/components/AppBar'
import RoutesList from '@/components/RoutesList'

export default {
  name: 'Location',
  components: { AppBar, RoutesList },
  data: () => ({
    location: {},
    routes: [],
    form: {}
  }),
  mounted () {
    this.clearForm()
    this.refreshRoutes()
  },
  computed: {
    ...mapGetters(['getLocationById', 'getRoutesByLocation'])
  },
  methods: {
    ...mapActions(['addRoute']),
    clearForm () {
      this.form = {
        name: '',
        photo: '',
        notes: ''
      }
    },
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
