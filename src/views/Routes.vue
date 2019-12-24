<template>
  <v-content>
    <app-bar title="Voies">
      <template v-slot:top-bar-actions>
        <v-bottom-sheet
          v-model="routeAddingSheet"
          inset>
          <template v-slot:activator="{ on }">
            <v-btn
              :dark="!$vuetify.theme.dark"
              :light="$vuetify.theme.dark"
              elevation="0"
              fab
              small
              v-on="on">
              <v-icon
                :dark="$vuetify.theme.dark"
                :light="!$vuetify.theme.dark">
                mdi-plus
              </v-icon>
            </v-btn>
          </template>
          <v-sheet>
            <select-menu
              v-if="gradeSelect"
              v-model="routeForm.grade"
              :choices="grades"
              name="Cotation"
              @back="gradeSelect = false"/>
            <select-menu
              v-if="locationSelect"
              v-model="routeForm.location"
              :choices="Object.keys(parsedLocations)"
              name="Lieu"
              @back="locationSelect = false"/>
            <template v-else>
              <app-bar
                title="Ajouter une voie"
                small-only
                fixed>
                <template #bar-left-actions>
                  <span
                    class="primary--text"
                    @click="resetForm">
                    Annuler
                  </span>
                </template>
                <template #bar-right-actions>
                  <span
                    class="primary--text"
                    @click="add">
                    Ajouter
                  </span>
                </template>
              </app-bar>
              <v-container class="px-0">
                <v-row>
                  <v-col cols="12">
                    <v-card
                      tile
                      elevation="0">
                      <v-list>
                        <v-list-item>
                          <v-row
                            class="mx-0"
                            align="center">
                            Nom
                            <v-text-field
                              v-model="routeForm.name"
                              placeholder="Nom de la voie"
                              hide-details
                              solo
                              flat/>
                          </v-row>
                        </v-list-item>
                        <v-divider/>
                        <v-list-item @click="locationSelect = true">
                          <v-list-item-content>
                            Lieu
                          </v-list-item-content>
                          <v-list-item-icon>
                            <v-icon>mdi-chevron-right</v-icon>
                          </v-list-item-icon>
                        </v-list-item>
                        <v-list-item @click="gradeSelect = true">
                          <v-list-item-content>
                            Cotation
                          </v-list-item-content>
                          <v-list-item-icon>
                            <v-icon>mdi-chevron-right</v-icon>
                          </v-list-item-icon>
                        </v-list-item>
                        <v-divider/>
                        <v-list-item>
                          <v-slider
                            v-model="routeForm.length"
                            label="Longueur"
                            class="align-center"
                            :max="300"
                            :min="0"
                            hide-details>
                            <template #append>
                              <v-text-field
                                v-model="routeForm.length"
                                class="mt-0 pt-0"
                                type="number"
                                style="width: 60px"
                                hide-details
                                single-line/>
                            </template>
                          </v-slider>
                        </v-list-item>
                      </v-list>
                    </v-card>
                  </v-col>
                  <v-col cols="12">
                    <v-card
                      tile
                      elevation="0">
                      <v-list>
                        <v-list-item>
                          <v-list-item-content>
                            Définir un objectif
                          </v-list-item-content>
                          <v-spacer/>
                          <v-switch
                            v-model="routeForm.enableGoal"
                            color="primary"
                            inset/>
                        </v-list-item>
                        <template v-if="routeForm.enableGoal">
                          <v-divider/>
                          <v-list-item>
                            <span class="primary--text">
                              {{ dateToText(routeForm.goal) }}
                            </span>
                          </v-list-item>
                          <v-divider/>
                          <v-list-item>
                            <v-date-picker
                              v-if="routeForm.enableGoal"
                              v-model="routeForm.goal"
                              style="box-shadow: 0;"
                              first-day-of-week="1"
                              color="primary"
                              no-title
                              full-width/>
                          </v-list-item>
                        </template>
                      </v-list>
                    </v-card>
                  </v-col>
                  <v-col cols="12">
                    <v-card>
                      <v-list>
                        <v-list-item>
                          <v-row
                            class="mx-0"
                            align="center">
                            Notes
                            <v-textarea
                              id="notes-textarea"
                              v-model="routeForm.notes"
                              placeholder="Notes à rajouter à propos de la voie"
                              rows="1"
                              auto-grow
                              hide-details
                              solo
                              flat/>
                          </v-row>
                        </v-list-item>
                      </v-list>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </template>
          </v-sheet>
        </v-bottom-sheet>
      </template>
    </app-bar>
    <v-container class="px-0">
      <v-row wrap>
        <v-col
          cols="12"
          class="hidden-md-and-up">
          <h2>Lieux</h2>
          <v-col
            v-for="location in locations"
            :key="location.id"
            cols="12"
            md="6">
            <v-card
              elevation="0"
              :to="'/locations/' + location.id">
              <v-img
                class="white--text align-end"
                :aspect-ratio="16/9"
                :src="location.photos[0]">
                <v-card-title>{{ location.name }}</v-card-title>
              </v-img>
            </v-card>
          </v-col>
        </v-col>
        <v-col
          cols="12"
          class="hidden-md-and-up">
          <h2>Tags</h2>
          <v-list
            elevation="0"
            flat>
            <v-list-item
              v-for="tag in tags"
              :key="tag.name"
              :to="`/tags/${tag.id}`"
              link>
              <v-list-item-icon>
                <v-icon :color="tag.color">mdi-circle</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ tag.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col
          v-for="location in locations"
          :key="location.id"
          cols="12">
          <h2>{{ location.name }}</h2>
          <routes-list :routes="routes[location.id]"/>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AppBar from '@/components/AppBar.vue'
import RoutesList from '@/components/RoutesList'
import SelectMenu from '@/components/SelectMenu'
import { grades, tags, defaultRouteForm } from '@/utils/data'
import { dateToText } from '@/utils/parsing'

export default {
  name: 'Routes',
  components: {
    AppBar, RoutesList, SelectMenu
  },
  data () {
    return {
      locations: [],
      parsedLocations: {},
      routes: {},
      routeForm: Object.assign({}, defaultRouteForm),

      routeAddingSheet: false,
      gradeSelect: false,
      locationSelect: false,

      grades,
      tags
    }
  },
  mounted () {
    this.locations = this.getLocations
    this.locations.forEach((location) => {
      this.parsedLocations[location.name] = location.id
    })
    this.refreshRoutes()
  },
  computed: {
    ...mapGetters(['getLocations', 'getRoutesByLocation', 'getLocationById'])
  },
  methods: {
    ...mapActions(['addRoute']),
    dateToText,
    add () {
      this.routeForm.location = this.parsedLocations[this.routeForm.location]
      if (!this.routeForm.enableGoal) this.routeForm.goal = false
      this.addRoute(this.routeForm)
      this.resetForm()
      this.refreshRoutes()
    },
    resetForm () {
      this.routeForm = Object.assign({}, this.defaultRouteForm)
      this.routeAddingSheet = false
      this.gradeSelect = false
    },
    refreshRoutes () {
      this.routes = {}
      this.locations.forEach(location => {
        this.routes[location.id] = this.getRoutesByLocation(location.id)
      })
    }
  }
}
</script>

<style>
#notes-textarea {
  margin-top: 0;
}
</style>
