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
                  color="secondary"
                  elevation="0"
                  fab
                  small
                  v-on="on">
                  <v-icon>mdi-plus</v-icon>
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
      <list-group>
        <v-list class="background">
          <v-list-item v-if="competitions.length === 0">
            {{ $t('competitions.noCompetitions') }}
          </v-list-item>
          <template v-for="(competition, i) in competitions">
            <v-list-item
              :key="`${competition.id}--list-item`"
              no-action>
              <v-menu offset-y>
                <template v-slot:activator="{ on }">
                  <div
                    class="v-list-item__icon v-list-group__header__prepend-icon"
                    v-on="on">
                    <v-tooltip
                      open-delay="500"
                      bottom>
                      <template #activator="{ on }">
                        <v-btn
                          icon
                          v-on="on">
                          <v-icon :color="icons.get(competition).color">{{ icons.get(competition).icon }}</v-icon>
                        </v-btn>
                      </template>
                      <span>{{ $t('competitions.participation') }}</span>
                    </v-tooltip>
                  </div>
                </template>
                <v-list>
                  <v-list-item
                    v-for="icon in [icons.notParticipating, icons.thinking, icons.participating]"
                    :key="icon.icon"
                    @click="setParticipation(competition.id, icon.name)">
                    <v-list-item-icon>
                      <v-icon :color="icon.color">{{ icon.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>{{ $t(`competitions.${icon.name}`) }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
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
import { mapGetters, mapActions } from 'vuex'
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
    ...mapActions(['setCompetitionParticipation']),
    dateToText,
    refreshCompetitions () {
      this.competitions = this.getCompetitions
    },
    setParticipation (id, participation) {
      this.setCompetitionParticipation({
        id,
        participation
      })
      this.refreshCompetitions()
    }
  }
}
</script>
