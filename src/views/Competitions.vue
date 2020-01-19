<template>
  <v-content>
    <app-bar title="Compétitions"/>
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
                  &mdash; {{ dateToText(competition.timestamp) }}
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
import { competitionIcons } from '@/utils/data'
import { dateToText } from '@/utils/parsing'

export default {
  name: 'Competitions',
  data () {
    return {
      competitions: [],

      icons: competitionIcons
    }
  },
  mounted () {
    this.competitions = this.getCompetitions
  },
  computed: {
    ...mapGetters(['getCompetitions', 'getLocationById'])
  },
  methods: {
    dateToText
  }
}
</script>
