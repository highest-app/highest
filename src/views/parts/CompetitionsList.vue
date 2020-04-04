<template>
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
            <template #activator="{ on: menu }">
              <div class="v-list-item__icon v-list-group__header__prepend-icon">
                <v-tooltip
                  open-delay="500"
                  bottom>
                  <template #activator="{ on: tooltip }">
                    <v-btn
                      icon
                      v-on="{ ...menu, ...tooltip }">
                      <v-icon :color="icons[competition.participation].color">{{ icons[competition.participation].icon }}</v-icon>
                    </v-btn>
                  </template>
                  <span>{{ $t('competitions.participation') }}</span>
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
                  <router-link :to="`/locations/${competition.location.value.id}`">
                    {{ competition.location.value.name }}
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
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { competitionIcons as icons } from '@/utils/data'
import { dateToText } from '@/utils/parsing'

export default {
  name: 'CompetitionsList',
  props: {
    competitions: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      icons
    }
  },
  mounted () {
    this.competitions.forEach((competition) => {
      if (competition.location.type === 'location') {
        competition.location.value = this.getLocationById(competition.location.value)
      }
    })
  },
  computed: {
    ...mapGetters(['getLocationById'])
  },
  methods: {
    ...mapActions(['setCompetitionParticipation']),
    dateToText,
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
