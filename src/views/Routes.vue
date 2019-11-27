<template>
  <v-container>
    <v-row wrap>
      <v-col cols="12" md="6">
        <v-card>
          <v-img :src="location.photos[0]"/>
          <v-card-title>{{location.name}}</v-card-title>
          <v-card-subtitle>{{routes.length}} voie(s)</v-card-subtitle>
          <v-card-text>
            {{location.notes}}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              v-if="location.id !== 'default'"
              @click="editLocation"
              text>
              Éditer ce lieu
            </v-btn>
            <v-btn
              to="/locations"
              color="primary"
              text>
              {{location.id === 'default' ? 'Choisir un lieu' : 'Changer de lieu'}}
            </v-btn>
            <v-btn
              v-if="location.id !== 'default'"
              @click="showPhotos = !showPhotos"
              icon>
              <v-icon>{{ showPhotos ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </v-card-actions>
          <v-expand-transition>
            <div v-show="showPhotos">
              <v-divider></v-divider>
              <v-card-title>Toutes les photos</v-card-title>
              <v-img
                v-for="photo in location.photos"
                :key="photo"
                :src="photo"
              />
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-row>
          <v-col cols="12">
            <adding-menu label="Ajouter une voie">
              <v-row>
                <template v-if="location.id === 'default'">
                  <v-col cols="12">
                  <v-btn to="/locations" color="primary" block>
                    Choisir un lieu
                  </v-btn>
                </v-col>
                </template>
                <template v-else>
                  <v-col cols="6" class="pb-0">
                    <v-text-field
                      v-model="form.name"
                      label="Nom"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6" class="pb-0">
                    <v-select
                      v-model="form.grade"
                      :items="grades"
                      label="Cotation"
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-slider
                      v-model="form.length"
                      label="Longueur"
                      class="align-center"
                      :max="300"
                      :min="0"
                      hide-details
                    >
                      <template v-slot:append>
                        <v-text-field
                          v-model="form.length"
                          class="mt-0 pt-0"
                          hide-details
                          single-line
                          type="number"
                          style="width: 60px"
                        ></v-text-field>
                      </template>
                    </v-slider>
                  </v-col>
                  <v-col cols="12">
                    <v-switch
                      v-model="form.enableGoal"
                      color="primary"
                      label="Définir un objectif"
                      inset />
                    <v-date-picker
                      v-model="form.goal"
                      :disabled="!form.enableGoal"
                      color="primary"
                      full-width />
                  </v-col>
                  <v-col cols="12" class="pt-0">
                    <v-textarea
                      v-model="form.notes"
                      label="Notes"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12">
                    <v-btn @click="add" color="primary" block>
                      Ajouter
                    </v-btn>
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
              <v-list v-else two-line>
                <v-list-group
                  v-for="route in routes" :key="route.id"
                  v-model="route.active"
                  :color="getIcon(route).color"
                  no-action
                >
                  <template v-slot:activator>
                    <div class="v-list-item__icon v-list-group__header__prepend-icon">
                      <v-icon :color="getIcon(route).color">{{getIcon(route).icon}}</v-icon>
                    </div>
                    <v-list-item-content>
                      <v-list-item-title>{{route.name}}</v-list-item-title>
                      <v-list-item-subtitle>
                        <span class='text--primary'>{{route.grade}}</span>
                        &mdash; {{route.notes}}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-switch
                          v-model="route.finished"
                          color="primary"
                          label="Marquer comme terminée"
                          inset
                          @click.stop="switchFinished(route.id)" />
                      </v-col>
                      <v-col cols="1" offset="11">
                        <v-btn
                          color="red darken-4"
                          text
                          icon
                          @click="remove(route.id)">
                          <v-icon>mdi-delete-outline</v-icon>
                        </v-btn>
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
import { grades } from '../utils/data'
import AddingMenu from '@/components/AddingMenu'

export default {
  name: 'Routes',
  components: {AddingMenu},
  data: () => ({
    location: {},
    routes: [],
    showPhotos: false,
    form: {},
    grades
  }),
  mounted () {
    this.clearForm()
    this.refreshRoutes()
  },
  computed: {
    ...mapGetters(['getRoutes', 'getRoutesByLocation', 'getLocationById'])
  },
  methods: {
    ...mapActions(['addRoute', 'removeRoute', 'switchFinishedRoute']),
    getIcon (route) {
      if (route.finished) {
        return {
          color: 'primary',
          icon: 'mdi-check-outline'
        }
      }
      if (route.goal) {
        if (route.goal > Date.now()/1000) {
          return {
            color: 'orange',
            icon: 'mdi-clock-outline'
          }
        }
        return {
          color: 'red darken-4',
          icon: 'mdi-clock-outline'
        }
      }
      return {
        color: '',
        icon: 'mdi-dots-horizontal'
      }
    },
    add () {
      this.form.location = this.location.id
      if (!this.form.enableGoal) {
        this.form.goal = false
      }
      this.addRoute(this.form)
      this.clearForm()
      this.refreshRoutes()
    },
    remove (id) {
      this.removeRoute(id)
      this.refreshRoutes()
    },
    switchFinished(id) {
      this.switchFinishedRoute(id)
    },
    refreshRoutes () {
      if (this.$route.params.id === undefined) {
        this.location = {
          id: "default",
          name: "Tous les lieux",
          photos: []
        }
        this.routes = this.getRoutes
      }
      else {
        this.location = this.getLocationById(this.$route.params.id)
        if (this.location === undefined) {
          this.$router.push('home')
        } else {
          this.routes = this.getRoutesByLocation(this.location.id)
        }
      }
    },
    clearForm () {
      this.form = {
        location: '',
        name: '',
        grade: '',
        notes: '',
        length: 0,
        enableGoal: false,
        goal: new Date().toISOString().substr(0, 10),
      }
    },
    editLocation () {

    }
  }
}
</script>

<style scoped>

</style>