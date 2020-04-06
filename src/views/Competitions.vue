<template>
  <v-content>
    <app-bar :title="$tc('generic.competition', 2)">
      <template #top-bar-actions>
        <responsive-dialog>
          <template #activator>
            <v-tooltip
              open-delay="500"
              bottom>
              <template #activator="{ on }">
                <v-btn
                  class="gradient--secondary"
                  elevation="0"
                  fab
                  small
                  v-on="on">
                  <v-icon color="white">mdi-plus</v-icon>
                </v-btn>
              </template>
              <span>{{ $t('competitions.add') }}</span>
            </v-tooltip>
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
      <competitions-list :competitions="competitions"/>
    </page-body>
  </v-content>
</template>

<script>
import { mapGetters } from 'vuex'
import { competitionIcons as icons } from '@/utils/data'
import { defaultCompetitionForm } from '@/utils/forms'
import { dateToText } from '@/utils/parsing'
import CompetitionAdding from '@/views/parts/CompetitionAdding'
import CompetitionsList from '@/views/parts/CompetitionsList'

export default {
  name: 'Competitions',
  components: { CompetitionAdding, CompetitionsList },
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
