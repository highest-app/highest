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
        <v-row>
          <v-col
            cols="12"
            class="pt-0">
            <adding-menu label="Ajouter une voie">
              <v-row>
                <template v-if="location.id === null">
                  <v-col cols="12">
                    <v-btn
                      to="/locations"
                      color="primary"
                      block
                      text>
                      Choisir un lieu
                    </v-btn>
                  </v-col>
                </template>
                <template v-else>
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
                      v-model="routeForm.goal"
                      :disabled="!routeForm.enableGoal"
                      first-day-of-week="1"
                      color="primary"
                      full-width/>
                    <v-textarea
                      v-model="routeForm.notes"
                      label="Notes"/>
                    <v-row justify="end">
                      <v-btn
                        text
                        @click="routeForm = Object.assign({}, defaultRouteForm)">
                        Annuler
                      </v-btn>
                      <v-btn
                        color="primary"
                        text
                        @click="add">
                        Ajouter
                      </v-btn>
                    </v-row>
                  </v-col>
                </template>
              </v-row>
            </adding-menu>
          </v-col>
          <v-col cols="12">
            <v-card>
              <v-card-text v-if="routes.length === 0">
                Aucune voie pour le moment. Ajoutez-en une !
              </v-card-text>
              <v-list
                v-else
                two-line>
                <v-list-group
                  v-for="route in routes"
                  :key="route.id"
                  v-model="route.active"
                  :color="icons.get(route).color"
                  no-action>
                  <template v-slot:activator>
                    <div class="v-list-item__icon v-list-group__header__prepend-icon">
                      <v-icon :color="icons.get(route).color">{{ icons.get(route).icon }}</v-icon>
                    </div>
                    <v-list-item-content>
                      <v-list-item-title>{{ route.name }}</v-list-item-title>
                      <v-list-item-subtitle>
                        <span class="text--primary">{{ route.grade }}</span>
                        &mdash; {{ route.notes }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                  <v-container class="text--primary">
                    <v-row>
                      <v-col cols="12">
                        <p>{{ route.notes }}</p>
                        <v-img
                          v-for="photo in route.photos"
                          :key="photo"
                          :src="photo"/>
                        <v-row>
                          <v-col
                            cols="6"
                            align-self="center">
                            Objectif : {{ parseDate(route.goal) }}
                          </v-col>
                          <v-col cols="6">
                            <v-switch
                              v-model="route.finished"
                              color="primary"
                              label="Marquer comme terminée"
                              inset
                              @click.stop="switchFinishedRoute(route.id)"/>
                          </v-col>
                        </v-row>
                        <v-list>
                          <v-divider/>
                          <template
                            v-for="progression in route.progressions">
                            <v-list-item :key="progression.date">
                              <v-list-item-content>
                                <v-list-item-title>{{ timestampToText(progression.date) }}</v-list-item-title>
                                <p class="mb-0 paragraph--text">{{ progression.notes }}</p>
                              </v-list-item-content>
                              <v-list-item-action>
                                <v-btn
                                  v-touch="{
                                    left: () => alert('left'),
                                    right: () => alert('right')
                                  }"
                                  icon>
                                  <v-icon color="red darken-4">mdi-delete-outline</v-icon>
                                </v-btn>
                              </v-list-item-action>
                            </v-list-item>
                            <v-divider
                              :key="progression.date"/>
                          </template>
                          <v-list-item>
                            <v-list-item-content>
                              <v-list-item-title>Ajouter une progression :</v-list-item-title>
                              <v-row>
                                <v-col
                                  cols="12"
                                  class="pb-0">
                                  <v-row>
                                    <v-col
                                      cols="12"
                                      md="3">
                                      <v-menu
                                        v-model="route.progressionMenu"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="290px">
                                        <template v-slot:activator="{ on }">
                                          <v-text-field
                                            v-model="progressionForm.date"
                                            label="Date"
                                            readonly
                                            v-on="on"/>
                                        </template>
                                        <v-date-picker
                                          v-model="progressionForm.date"
                                          first-day-of-week="1"
                                          color="primary"
                                          no-title
                                          @input="route.progressionMenu = false"/>
                                      </v-menu>
                                    </v-col>
                                    <v-col
                                      cols="12"
                                      md="9">
                                      <v-textarea
                                        v-model="progressionForm.notes"
                                        rows="1"
                                        label="Notes"
                                        auto-grow/>
                                    </v-col>
                                  </v-row>
                                </v-col>
                                <v-col
                                  cols="12"
                                  class="py-0">
                                  <v-row justify="end">
                                    <v-btn
                                      text
                                      @click="progressionForm = Object.assign({}, defaultProgressionForm)">
                                      Annuler
                                    </v-btn>
                                    <v-btn
                                      color="primary"
                                      text
                                      @click="add">
                                      Ajouter
                                    </v-btn>
                                  </v-row>
                                </v-col>
                              </v-row>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list>
                        <v-divider/>
                        <v-row
                          justify="end"
                          class="pt-1">
                          <v-btn
                            text>
                            Éditer
                          </v-btn>
                          <v-btn
                            color="red darken-4"
                            text
                            @click="remove(route.id)">
                            Supprimer
                          </v-btn>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-list-group>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { grades, icons } from '@/utils/data'
import { timestampToText } from '@/utils/parsing'
import AddingMenu from '@/components/AddingMenu'

export default {
  name: 'Routes',
  components: { AddingMenu },
  data () {
    const defaultRouteForm = Object.freeze({
      location: '',
      name: '',
      grade: '',
      notes: '',
      length: 0,
      enableGoal: false,
      goal: new Date().toISOString().substr(0, 10),
    })
    const defaultProgressionForm = Object.freeze({
      date: new Date().toISOString().substr(0, 10),
      notes: ''
    })
    return {
      location: {},
      routes: [],
      routeForm: Object.assign({}, defaultRouteForm),
      progressionForm: Object.assign({}, defaultProgressionForm),

      showPhotos: false,

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
    ...mapActions(['addRoute', 'removeRoute', 'switchFinishedRoute', 'addProgression', 'removeProgression']),
    timestampToText,
    add () {
      this.routeForm.location = this.location.id
      if (!this.routeForm.enableGoal) this.routeForm.goal = false
      this.addRoute(this.routeForm)
      this.resetForms()
      this.refreshRoutes()
    },
    remove (id) {
      this.removeRoute(id)
      this.refreshRoutes()
    },
    refreshRoutes () {
      const id = this.$route.params.id
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
    parseDate(goal) {
      if (goal === false) {
        return 'aucun'
      }
      return timestampToText(goal)
    },
    editLocation () {

    }
  }
}
</script>
