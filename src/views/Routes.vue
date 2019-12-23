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
import { grades, defaultRouteForm, tags } from '@/utils/data'

export default {
  name: 'Routes',
  components: {
    AppBar, RoutesList
  },
  data () {
    return {
      locations: [],
      routes: {},
      routeForm: Object.assign({}, defaultRouteForm),

      routeAddingSheet: false,

      grades,
      tags
    }
  },
  mounted () {
    this.locations = this.getLocations
    this.refreshRoutes()
  },
  computed: {
    ...mapGetters(['getLocations', 'getRoutesByLocation', 'getLocationById'])
  },
  methods: {
    ...mapActions(['addRoute']),
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
      this.locations.forEach(location => {
        this.routes[location.id] = this.getRoutesByLocation(location.id)
      })
    },
    editLocation () {

    }
  }
}
</script>
