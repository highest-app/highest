<template>
  <v-content>
    <app-bar title="Voies">
      <template #top-bar-actions>
        <v-bottom-sheet
          v-model="routeAddingSheet"
          scrollable
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
          <v-card class="background">
            <v-card-text
              class="pa-0"
              style="overflow-x: hidden;">
              <select-menu
                v-if="gradeSelect"
                v-model="routeForm.grade"
                :choices="grades"
                name="Cotation"
                auto-back
                @back="gradeSelect = false"/>
              <select-menu
                v-else-if="locationSelect"
                v-model="routeForm.location"
                :choices="Object.keys(parsedLocations)"
                name="Lieu"
                auto-back
                @back="locationSelect = false"/>
              <template v-else>
                <app-bar
                  title="Ajouter une voie"
                  small-only
                  fixed>
                  <template #bar-left-actions>
                    <a @click="resetForm">Annuler</a>
                  </template>
                  <template #bar-right-actions>
                    <a @click="add">Ajouter</a>
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
                              <span class="subtitle-1">Nom</span>
                              <v-text-field
                                v-model="routeForm.name"
                                placeholder="Nom de la voie"
                                hide-details
                                solo
                                flat/>
                            </v-row>
                          </v-list-item>
                          <v-divider/>
                          <v-list-item
                            class="select-menu__trigger"
                            @click="locationSelect = true">
                            <v-list-item-content>
                              <span class="subtitle-1">Lieu</span>
                            </v-list-item-content>
                            <v-spacer/>
                            <span class="select-menu__selected--text subtitle-1">{{ routeForm.location }}</span>
                            <v-list-item-icon>
                              <v-icon>mdi-chevron-right</v-icon>
                            </v-list-item-icon>
                          </v-list-item>
                          <v-divider/>
                          <v-list-item
                            class="select-menu__trigger"
                            @click="gradeSelect = true">
                            <v-list-item-content>
                              <span class="subtitle-1">Cotation</span>
                            </v-list-item-content>
                            <v-spacer/>
                            <span class="select-menu__selected--text subtitle-1">{{ routeForm.grade }}</span>
                            <v-list-item-icon>
                              <v-icon>mdi-chevron-right</v-icon>
                            </v-list-item-icon>
                          </v-list-item>
                          <v-divider/>
                          <v-list-item>
                            <v-row
                              class="mx-0"
                              align="center">
                              <span class="subtitle-1">Longueur</span>
                              <v-slider
                                v-model="routeForm.length"
                                class="align-center px-3"
                                :max="300"
                                :min="0"
                                hide-details/>
                              <span class="subtitle-1">{{ routeLength }}</span>
                            </v-row>
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
                              <span class="subtitle-1 pr-3">Définir un objectif</span>
                            </v-list-item-content>
                            <v-spacer/>
                            <v-switch
                              v-model="routeForm.enableGoal"
                              class="mt-0 pt-0"
                              color="primary"
                              hide-details
                              inset/>
                          </v-list-item>
                          <template v-if="routeForm.enableGoal">
                            <v-divider/>
                            <v-list-item>
                              <span class="subtitle-1 primary--text">
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
                      <v-card
                        elevation="0"
                        tile>
                        <v-list>
                          <v-list-item>
                            <v-row
                              class="mx-0"
                              align="center">
                              <span class="subtitle-1">Notes</span>
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
            </v-card-text>
          </v-card>
        </v-bottom-sheet>
      </template>
    </app-bar>
    <div class="page-body">
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
            class="background"
            elevation="0">
            <template v-for="(tag, i) in tags">
              <v-list-item
                :key="`${tag.name}--list-item`"
                :to="`/tags/${tag.id}`"
                link>
                <v-list-item-icon>
                  <v-icon :color="tag.color">mdi-circle</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ tag.name }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider
                v-if="i !== tags.length - 1"
                :key="`${tag.name}--divider`"
                inset/>
            </template>
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
    </div>
  </v-content>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { grades, tags, defaultRouteForm } from '@/utils/data'
import { dateToText } from '@/utils/parsing'

export default {
  name: 'Routes',
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
    ...mapGetters(['getLocations', 'getRoutesByLocation', 'getLocationById']),
    routeLength () {
      return `${this.routeForm.length}m`
    }
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
      this.locationSelect = false
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
