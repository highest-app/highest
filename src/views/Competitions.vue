<template>
  <v-content>
    <app-bar :title="$tc('generic.competition', 2)">
      <template #top-bar-actions>
        <responsive-dialog>
          <template #activator>
            <v-btn
              color="secondary"
              elevation="0"
              fab
              small
              v-on="on">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <template #dialog>
            <competition-adding
              :locations="parsedLocations"
              @close="refreshCompetitions"/>
          </template>
        </responsive-dialog>
      </template>
    </app-bar>
    <page-body>
      <list-group>
        <v-list class="background">
          <v-list-item v-if="competitions.length === 0">
            {{ $t('competitions.noCompetitions') }}
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
                  <span class="text--primary">
                    <template v-if="competition.location.type === 'string'">
                      <a
                        :href="`https://www.openstreetmap.org/search?query=${competition.location.value}`"
                        target="_blank">
                        {{ competition.location.value }}
                      </a>
                    </template>
                    <template v-if="competition.location.type === 'location'">
                      <router-link :to="`/locations/${locations[competition.location.value].id}`">
                        {{ locations[competition.location.value].name }}
                      </router-link>
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
import { competitionIcons as icons } from '@/utils/data'
import { defaultCompetitionForm } from '@/utils/forms'
import { dateToText } from '@/utils/parsing'
import CompetitionAdding from '@/views/parts/CompetitionAdding'

export default {
  name: 'Competitions',
  components: { CompetitionAdding },
  data () {
    return {
      competitions: [],
      locations: {},
      parsedLocations: {},

      locationSelect: false,
      form: Object.assign({}, defaultCompetitionForm),

      icons
    }
  },
  mounted () {
    this.refreshCompetitions()
    let locationList = this.getLocations
    locationList.forEach((location) => {
      this.locations[location.id] = location
      this.parsedLocations[location.name] = location.id
    })
  },
  computed: {
    ...mapGetters(['getCompetitions', 'getLocations', 'getLocationById'])
  },
  methods: {
    dateToText,
    refreshCompetitions () {
      this.competitions = this.getCompetitions
    }
  }
}
</script>
