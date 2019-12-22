<template>
  <main>
    <app-bar
      :image="location.id !== null ? location.photos[0] : ''"
      :title="location.id === null ? 'Voies' : location.name"/>
    <v-content>
      <v-container>
        <v-row wrap>
          <v-col
            cols="12"
            md="6">
            <p>{{ location.notes }}</p>
            <v-carousel
              v-if="location.photos.length > 1"
              :continuous="false"
              hide-delimiters
              touch>
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
            <v-card>
              <v-bottom-sheet
                v-model="routeAddingSheet"
                inset>
                <template v-slot:activator="{ on }">
                  <v-list-item
                    v-if="location.id !== null"
                    v-on="on">
                    <v-list-item-content>
                      <v-list-item-title class="primary--text">Ajouter une voie</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>
                <v-sheet
                  class="text-center">
                  <app-bar
                    title="Ajouter une voie"
                    small-only
                    fixed>
                    <template v-slot:bar-left-actions>
                      <span
                        class="primary--text"
                        @click="resetForm">
                        Annuler
                      </span>
                    </template>
                    <template v-slot:bar-right-actions>
                      <span
                        class="primary--text"
                        @click="add">
                        Ajouter
                      </span>
                    </template>
                  </app-bar>
                  <v-container>
                    <v-row>
                      <v-col
                        cols="6"
                        class="pb-0">
                        <v-text-field
                          v-model="routeForm.name"
                          label="Nom"/>
                      </v-col>
                      <v-col
                        cols="6"
                        class="pb-0">
                        <v-select
                          v-model="routeForm.grade"
                          :items="grades"
                          label="Cotation"/>
                      </v-col>
                      <v-col cols="12">
                        <v-slider
                          v-model="routeForm.length"
                          label="Longueur"
                          class="align-center"
                          :max="300"
                          :min="0"
                          hide-details>
                          <template v-slot:append>
                            <v-text-field
                              v-model="routeForm.length"
                              class="mt-0 pt-0"
                              type="number"
                              style="width: 60px"
                              hide-details
                              single-line/>
                          </template>
                        </v-slider>
                        <v-switch
                          v-model="routeForm.enableGoal"
                          color="primary"
                          label="Définir un objectif"
                          inset/>
                        <v-date-picker
                          v-if="routeForm.enableGoal"
                          v-model="routeForm.goal"
                          first-day-of-week="1"
                          color="primary"
                          full-width/>
                        <v-textarea
                          v-model="routeForm.notes"
                          label="Notes"/>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-sheet>
              </v-bottom-sheet>
              <v-card-text v-if="routes.length === 0">
                Aucune voie pour le moment. Ajoutez-en une !
              </v-card-text>
              <v-list
                v-else>
                <v-list-item
                  v-for="route in routes"
                  :key="route.id"
                  no-action>
                  <div class="v-list-item__icon v-list-group__header__prepend-icon">
                    <v-icon :color="icons.get(route).color">{{ icons.get(route).icon }}</v-icon>
                  </div>
                  <v-list-item-content>
                    <v-list-item-title>{{ route.name }}</v-list-item-title>
                    <v-list-item-subtitle>
                      <span class="text--primary">{{ route.grade }}</span>
                      &mdash; {{ route.goal ? `Objectif : ${timestampToText(route.goal)}` : 'Aucun objectif' }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn
                      :ripple="false"
                      icon
                      :to="`/locations/${route.location}/${route.id}`">
                      <v-icon color="primary">mdi-information-outline</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AppBar from '@/components/AppBar.vue'
import { grades, icons, defaultRouteForm } from '@/utils/data'
import { timestampToText } from '@/utils/parsing'

export default {
  name: 'Routes',
  components: {
    AppBar,
  },
  data () {
    return {
      location: {},
      routes: [],
      routeForm: Object.assign({}, defaultRouteForm),

      showPhotos: false,
      routeAddingSheet: false,

      grades,
      icons
    }
  },
  mounted () {
    this.refreshRoutes()
  },
  computed: {
    ...mapGetters(['getRoutes', 'getRoutesByLocation', 'getLocationById'])
  },
  methods: {
    ...mapActions(['addRoute']),
    timestampToText,
    add () {
      this.routeForm.location = this.location.id
      if (!this.routeForm.enableGoal) this.routeForm.goal = false
      this.addRoute(this.routeForm)
      this.resetForm()
      this.refreshRoutes()
    },
    resetForm () {
      this.routeForm = Object.assign({}, this.defaultRouteForm)
      this.routeAddingSheet = false
    },
    refreshRoutes () {
      const id = this.$route.params.location
      if (id === undefined) {
        this.location = {
          id: null,
          name: 'Tous les lieux',
          photos: []
        }
        this.routes = this.getRoutes
      }
      else {
        this.location = this.getLocationById(id)
        if (this.location === undefined) this.$router.push('/locations')
        else this.routes = this.getRoutesByLocation(this.location.id)
      }
    },
    editLocation () {

    }
  }
}
</script>
