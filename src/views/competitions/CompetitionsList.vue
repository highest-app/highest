<template>
  <list-group>
    <competition-edit
      v-model="editDialog"
      :competition="competitionToEdit"/>
    <popup
      v-model="removePopup"
      right-text="terms.actions.remove"
      critical
      @right-action="confirmRemove">
      <template #description>{{ $t('competitions.actions.removeConfirmation') }}</template>
    </popup>
    <v-list :class="{ background, 'py-0': paddingless }">
      <illustration
        v-if="!competitions.length"
        image="/img/illustrations/competitions.svg"
        label="competitions.noCompetitions"/>
      <template v-for="(competition, i) in parsedCompetitions">
        <v-list-item
          :key="`${competition.id}--list-item`"
          :aria-label="$t('competitions.helps.view', { competition: competition.name })"
          no-action>
          <v-menu
            v-if="!hideAction"
            offset-y>
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
          <v-list-item-content v-ripple>
            <router-link :to="{ name: 'competition', params: { competition: competition.id }}">
              <v-list-item-title class="text--primary">{{ competition.name }}</v-list-item-title>
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
            </router-link>
          </v-list-item-content>
          <v-list-item-action>
            <v-menu>
              <template #activator="{ on: menu }">
                <v-tooltip
                  open-delay="500"
                  bottom>
                  <template #activator="{ on: tooltip }">
                    <v-btn
                      :aria-label="$t('competitions.helps.view', { competition: competition.name })"
                      :ripple="false"
                      icon
                      v-on="{ ...menu, ...tooltip }">
                      <v-icon color="action-text">mdi-dots-horizontal</v-icon>
                    </v-btn>
                  </template>
                  <span>{{ $t('terms.actions.more') }}</span>
                </v-tooltip>
              </template>
              <v-card
                class="sheet-background"
                style="border-radius: 12px">
                <list-group>
                  <card
                    icon="mdi-pencil-outline"
                    top
                    @click="edit(competition)">
                    <template #title>{{ $t('competitions.actions.edit') }}</template>
                  </card>
                  <card
                    icon="mdi-delete-outline"
                    top
                    bottom
                    @click="remove(competition.id)">
                    <template #title>{{ $t('competitions.actions.remove') }}</template>
                  </card>
                </list-group>
              </v-card>
            </v-menu>
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
import CompetitionEdit from '@/views/competitions/CompetitionEdit'
import { competitionIcons as icons } from '@/utils/data'

export default {
  name: 'CompetitionsList',
  props: {
    background: Boolean,
    competitions: {
      type: Array,
      required: true
    },
    hideAction: Boolean,
    paddingless: Boolean
  },
  components: { CompetitionEdit },
  data() {
    return {
      icons,

      competitionToEdit: {},
      editDialog: false,

      competitionToRemove: '',
      removePopup: false
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
    ...mapActions(['setCompetitionParticipation', 'removeCompetition']),
    setParticipation(id, participation) {
      this.setCompetitionParticipation({
        id,
        participation
      })
    },
    edit(competition) {
      this.competitionToEdit = Object.assign({}, competition)
      this.editDialog = true
    },
    remove(id) {
      this.competitionToRemove = id
      this.removePopup = true
    },
    confirmRemove() {
      this.removeCompetition(this.competitionToRemove)
      this.removePopup = false
    },
  }
}
</script>
