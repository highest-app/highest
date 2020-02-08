<template>
  <v-content>
    <app-bar title="Compétitions">
      <template #top-bar-actions>
        <v-bottom-sheet
          v-model="addingSheet"
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
            <select-menu
              v-if="locationSelect"
              v-model="form.location"
              :choices="Object.keys(parsedLocations)"
              name="Lieu"
              auto-back
              @back="locationSelect = false"/>
            <template v-else>
              <app-bar
                title="Ajouter une compétition"
                small-only
                fixed>
                <template #bar-left-actions>
                  <a @click="resetForm">Annuler</a>
                </template>
                <template #bar-right-actions>
                  <a @click="add">Ajouter</a>
                </template>
              </app-bar>
              <page-body>
                <list-group>
                  <card top>
                    <template #title>Nom</template>
                    <template #input>
                      <v-text-field
                        v-model="form.name"
                        placeholder="Nom de la compétition"
                        hide-details
                        solo
                        flat/>
                    </template>
                  </card>
                  <card
                    clickable
                    @click.native="locationSelect = true">
                    <template #title>Lieu</template>
                    <template #action-text>{{ form.location }}</template>
                    <template #action>
                      <v-list-item-icon>
                        <v-icon>mdi-chevron-right</v-icon>
                      </v-list-item-icon>
                    </template>
                  </card>
                  <card>
                    <template #title>Description</template>
                    <template #input>
                      <v-textarea
                        id="notes-textarea"
                        v-model="form.description"
                        placeholder="Description de la compétition"
                        rows="1"
                        auto-grow
                        hide-details
                        solo
                        flat/>
                    </template>
                  </card>
                  <card>
                    <template #title>
                      <span class="primary--text">
                        {{ dateToText(form.date) }}
                      </span>
                    </template>
                  </card>
                  <card>
                    <template #title>
                      <v-date-picker
                        v-model="form.date"
                        style="box-shadow: 0;"
                        first-day-of-week="1"
                        color="primary"
                        no-title
                        full-width/>
                    </template>
                  </card>
                  <card bottom>
                    <template #title>Participation</template>
                    <template #action>
                      <v-btn-toggle
                        v-model="form.participation"
                        mandatory>
                        <v-btn
                          v-for="icon in [icons.notParticipating, icons.thinking, icons.participating]"
                          :key="icon.icon">
                          <v-icon :color="icon.color">{{ icon.icon }}</v-icon>
                        </v-btn>
                      </v-btn-toggle>
                    </template>
                  </card>
                </list-group>
              </page-body>
            </template>
          </v-card>
        </v-bottom-sheet>
      </template>
    </app-bar>
    <page-body>
      <list-group>
        <v-list class="background">
          <v-list-item v-if="competitions.length === 0">
            Aucune compétition pour le moment. Ajoutez-en une !
          </v-list-item>
          <template v-for="(competition, i) in competitions">
            <v-list-item
              :key="`${competition.id}--list-item`"
              no-action>
              <div class="v-list-item__icon v-list-group__header__prepend-icon">
                <v-icon :color="icons.get(competition).color">{{ icons.get(competition).icon }}</v-icon>
              </div>
              <v-list-item-content>
                <v-list-item-title>{{ competition.name }}</v-list-item-title>
                <v-list-item-subtitle>
                  <span
                    v-if="competition.location.type === 'string'"
                    class="text--primary">
                    <template v-if="competition.location.type === 'string'">
                      {{ competition.location.value }}
                    </template>
                    <template v-if="competition.location.type === 'location'">
                      {{ getLocationById(competition.location.value).name }}
                    </template>
                  </span>
                  &mdash; {{ dateToText(competition.date) }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn
                  :ripple="false"
                  icon
                  :to="`/competitions/${competition.id}`">
                  <v-icon color="primary">mdi-information-outline</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-divider
              v-if="i !== competitions.length - 1"
              :key="`${competition.id}--divider`"
              inset/>
          </template>
        </v-list>
      </list-group>
    </page-body>
  </v-content>
</template>

<script>
import { mapGetters } from 'vuex'
import { competitionIcons, defaultCompetitionForm } from '@/utils/data'
import { dateToText } from '@/utils/parsing'

export default {
  name: 'Competitions',
  data () {
    return {
      competitions: [],
      parsedLocations: {},

      addingSheet: false,
      locationSelect: false,
      form: Object.assign({}, defaultCompetitionForm),

      icons: competitionIcons
    }
  },
  mounted () {
    this.competitions = this.getCompetitions
    let locations = this.getLocations
    locations.forEach((location) => {
      this.parsedLocations[location.name] = location.id
    })
  },
  computed: {
    ...mapGetters(['getCompetitions', 'getLocations', 'getLocationById'])
  },
  methods: {
    dateToText,
    resetForm () {
      this.form = Object.assign({}, defaultCompetitionForm)
      this.addingSheet = false
      this.locationSelect = false
    }
  }
}
</script>
