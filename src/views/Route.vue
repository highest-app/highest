<template>
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
                        <v-list-item-title>{{ timestampToText(progression.date) }}</v-list-item-title>
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
                    @click="deleteThis(route.id)">
                    Supprimer
                  </v-btn>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { defaultProgressionForm, defaultRouteForm } from '@/utils/data'
import { timestampToText } from '@/utils/parsing'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Route',
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
    ...mapGetters(['getRoute'])
  },
  methods: {
    ...mapActions(['deleteRoute', 'switchFinishedRoute', 'addProgression', 'removeProgression']),
    timestampToText,
    deleteThis (id) {
      this.deleteRoute(id)
      this.$router.back()
    }
  }
}
</script>
