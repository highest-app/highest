<template>
  <v-content>
    <app-bar
      :title="route.name"
      small-only>
      <template #bar-left-actions>
        <a @click="$router.back()">Retour</a>
      </template>
      <template #bar-right-actions>
        <a>Modifier</a>
      </template>
    </app-bar>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-container class="text--primary">
              <v-row>
                <v-col cols="12">
                  <p>{{ route.notes }}</p>
                  <v-img
                    v-for="photo in route.photos"
                    :key="photo"
                    :src="photo"/>
                  <v-switch
                    v-model="route.finished"
                    color="primary"
                    label="Marquer comme terminée"
                    inset
                    @click.stop="switchFinishedRoute(route.id)"/>
                  <v-list>
                    <v-divider/>
                    <template
                      v-for="progression in route.progressions">
                      <v-list-item :key="progression.date">
                        <v-list-item-content>
                          <v-list-item-title>{{ dateToText(progression.date) }}</v-list-item-title>
                          <p class="mb-0 paragraph--text">{{ progression.notes }}</p>
                        </v-list-item-content>
                        <v-list-item-action>
                          <v-btn icon>
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
                                      :value="progressionDatePicker"
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
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AppBar from '@/components/AppBar'
import { defaultProgressionForm, defaultRouteForm } from '@/utils/data'
import { dateToText } from '@/utils/parsing'

export default {
  name: 'Route',
  components: { AppBar },
  data() {
    return {
      route: {},

      routeForm: Object.assign({}, defaultRouteForm),
      progressionForm: Object.assign({}, defaultProgressionForm),
    }
  },
  mounted () {
    this.route = this.getRoute(this.$route.params.location, this.$route.params.route)
  },
  computed: {
    ...mapGetters(['getRoute']),
    progressionDatePicker () {
      return dateToText(this.progressionForm.date)
    }
  },
  methods: {
    ...mapActions(['deleteRoute', 'switchFinishedRoute', 'addProgression', 'removeProgression']),
    dateToText,
    deleteThis (id) {
      this.deleteRoute(id)
      this.$router.back()
    }
  }
}
</script>
