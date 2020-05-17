<template>
  <list-group>
    <v-list :class="{ background, 'py-0': paddingless }">
      <v-list-item v-if="competitions.length === 0">
        {{ $t('competitions.noCompetitions') }}
      </v-list-item>
      <template v-for="(competition, i) in parsedCompetitions">
        <v-list-item
          :key="`${competition.id}--list-item`"
          no-action>
          <v-menu offset-y>
            <template #activator="{ on: menu }">
              <div class="v-list-item__icon v-list-group__header__prepend-icon">
                <v-tooltip
                  open-delay="500"
                  bottom>
                  <template #activator="{ on: tooltip }">
                    <v-btn
                      :aria-label="$t('competitions.helps.participation', { competition: competition.name })"
                      icon
                      v-on="{ ...menu, ...tooltip }">
                      <v-icon :color="icons[competition.participation].color">{{ icons[competition.participation].icon }}</v-icon>
                    </v-btn>
                  </template>
                  <span>{{ $t('competitions.terms.participation') }}</span>
                </v-tooltip>
              </div>
            </template>
            <v-list>
              <v-list-item
                v-for="icon in Object.values(icons)"
                :key="icon.icon"
                @click="setParticipation(competition.id, icon.name)">
                <v-list-item-icon>
                  <v-icon :color="icon.color">{{ icon.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{ $t(`competitions.status.${icon.name}`) }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-list-item-content>
            <v-list-item-title>{{ competition.name }}</v-list-item-title>
            <v-list-item-subtitle>
              <span class="text--primary">
                <template v-if="competition.location.type === 'string'">
                  <a
                    :href="`https://www.openstreetmap.org/search?query=${competition.location.address}`"
                    target="_blank">
                    {{ competition.location.address }}
                  </a>
                </template>
                <template v-if="competition.location.type === 'location'">
                  <router-link :to="`/locations/${competition.location.id}`">
                    {{ competition.location.name }}
                  </router-link>
                </template>
              </span>
              &mdash; {{ dateToText(competition.date) }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn
              :aria-label="$t('competitions.helps.view', { competition: competition.name })"
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
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { competitionIcons as icons } from '@/utils/data'

export default {
  name: 'CompetitionsList',
  props: {
    background: Boolean,
    competitions: {
      type: Array,
      required: true
    },
    paddingless: Boolean
  },
  data () {
    return {
      icons
    }
  },
  computed: {
    ...mapGetters(['getLocationById']),
    parsedCompetitions() {
      let parsed = []
      this.competitions.forEach((rawCompetition) => {
        let competition = Object.assign({}, rawCompetition)
        if (competition.location.type === "location") {
          competition.location = {
            type: competition.location.type,
            ...this.getLocationById(competition.location.locationID)
          }
        }
        parsed.push(competition)
      })
      return parsed
    }
  },
  methods: {
    ...mapActions(['setCompetitionParticipation']),
    setParticipation (id, participation) {
      this.setCompetitionParticipation({
        id,
        participation
      })
    }
  }
}
</script>
