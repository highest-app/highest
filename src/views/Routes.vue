<template>
  <v-container>
    <v-row wrap>
      <v-col
        cols="12"
        md="6">
        <v-card>
          <v-img
            v-if="location.id !== null"
            :src="location.photos[0]"
            :aspect-ratio="16/9"/>
          <v-card-title>{{ location.name }}</v-card-title>
          <v-card-subtitle>{{ routes.length }} {{ routes.length === 1 ? 'voie' : 'voies' }}</v-card-subtitle>
          <v-card-text>
            {{ location.notes }}
          </v-card-text>
          <v-card-actions>
            <v-btn
              v-if="location.id !== null"
              icon
              @click="showPhotos = !showPhotos">
              <v-icon>{{ showPhotos ? 'mdi-image-off-outline' : 'mdi-image-outline' }}</v-icon>
            </v-btn>
            <v-spacer/>
            <v-btn
              v-if="location.id !== null"
              text
              @click="editLocation">
              Éditer ce lieu
            </v-btn>
            <v-btn
              to="/locations"
              color="primary"
              :active="false"
              text>
              {{ location.id === null ? 'Choisir un lieu' : 'Changer de lieu' }}
            </v-btn>
          </v-card-actions>
          <v-expand-transition>
            <div v-show="showPhotos">
              <v-divider/>
              <v-card-title>Toutes les photos</v-card-title>
              <v-img
                v-for="photo in location.photos"
                :key="photo"
                :src="photo"
                :aspect-ratio="16/9"/>
            </div>
          </v-expand-transition>
        </v-card>
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
              class="text-center"
              height="80%">
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-row justify="space-between">
                      <span
                        class="primary--text"
                        @click="resetForm">
                        Annuler
                      </span>
                      <span>Ajouter une voie</span>
                      <span
                        class="primary--text"
                        @click="add">
                        Ajouter
                      </span>
                    </v-row>
                  </v-col>
                  <v-col cols="12">
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
              v-model="route.active"
              :color="icons.get(route).color"
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
                  icon
                  :to="`${$route.params.location}/${route.id}`">
                  <v-icon color="primary">mdi-information-outline</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { grades, icons, defaultRouteForm } from '@/utils/data'
import { timestampToText } from '@/utils/parsing'

export default {
  name: 'Routes',
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
