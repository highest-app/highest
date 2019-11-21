<template>
  <v-container>
    <v-row wrap>
      <v-col cols="12" md="6">
        <v-card>
          <v-img :src="location.photos[0]"/>
          <v-card-title>{{location.name}}</v-card-title>
          <v-card-subtitle>{{routes.length}} voie(s)</v-card-subtitle>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn v-if="location.id !== 'default'" text @click="changeLocation">Éditer ce lieu</v-btn>
            <v-btn to="/locations" color="primary" text>{{location.id === 'default' ? 'Choisir un lieu' : 'Changer de lieu'}}</v-btn>
            <v-btn
              v-if="location.id !== 'default'"
              icon
              @click="showPhotos = !showPhotos"
            >
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
            <v-card>
              <v-list>
                <v-list-group
                  prepend-icon="mdi-plus"
                  :value="false"
                >
                  <template v-slot:activator>
                    <v-list-item-title>Ajouter une voie</v-list-item-title>
                  </template>

                  <v-list-item>
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
                          <v-menu
                            v-model="goalMenu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                v-model="form.goal"
                                label="Objectif"
                                readonly
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker v-model="form.goal" @input="goalMenu = false"></v-date-picker>
                          </v-menu>
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
                  </v-list-item>
                </v-list-group>
              </v-list>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card>
              <v-card-text v-if="routes.length === 0">
                Aucune voie pour le moment. Ajoutez-en une !
              </v-card-text>
              <v-list>
                <v-list-item v-for="route in routes" :key="route.id" two-line>
                  <v-list-item-icon>
                    <v-icon :color="getIcon(route).color">{{getIcon(route).icon}}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{route.name}}</v-list-item-title>
                    <v-list-item-subtitle>
                      <span class='text--primary'>{{route.grade}}</span>
                      &mdash; {{route.notes}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
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

export default {
  name: 'List of routes',
  data: () => ({
    location: {},
    routes: [],
    showPhotos: false,
    goalMenu: false,

    form: {
      location: '',
      name: '',
      grade: '',
      notes: '',
      length: 0,
      goal: new Date().toISOString().substr(0, 10),
    },
    grades: [
      '4a',
      '4b',
      '4c',
      '5a',
      '5b',
      '5c',
      '6a',
      '6b',
      '6c',
      '7a',
      '7b',
      '7c',
      '8a',
      '8b',
      '8c',
      '9a',
      '9b',
    ]
  }),
  mounted () {
    this.refreshRoutes()
  },
  computed: {
    ...mapGetters(['getRoutes', 'getRoutesByLocation', 'getLocationById'])
  },
  methods: {
    ...mapActions(['addRoute']),
    getIcon (route) {
      if (route.finished) {
        return {
          color: 'primary',
          icon: 'mdi-check-outline'
        }
      } else {
        if (route.goal === undefined) {
          return {
            color: '',
            icon: 'mdi-dots-horizontal'
          }
        } else {
          return {
          color: 'warning',
          icon: 'mdi-clock-outline'
        }
        }
      }
    },
    add () {
      this.form.location = this.location.id
      this.addRoute(this.form)
      this.refreshRoutes()
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
    }
  }
}
</script>

<style scoped>

</style>