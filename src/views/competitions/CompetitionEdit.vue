<template>
  <responsive-dialog v-model="dialog">
    <template #activator="{ on }">
      <slot
        name="activator"
        v-bind:on="on"/>
    </template>
    <template #dialog>
      <popup
        v-model="removePopup"
        right-text="terms.actions.remove"
        critical
        @right-action="remove">
        <template #description>{{ $t('competitions.actions.removeConfirmation') }}</template>
      </popup>
      <app-bar
        :title="$t('competitions.actions.edit')"
        small-only
        fixed>
        <template #bar-left-actions>
          <app-link @click="quit">{{ $t('terms.actions.cancel') }}</app-link>
        </template>
        <template #bar-right-actions>
          <app-link @click="validate">{{ $t('terms.actions.ok') }}</app-link>
        </template>
      </app-bar>
      <competition-form v-model="form"/>
      <div class="mt-4">
        <card-group>
          <responsive-dialog
            v-if="transferableLocations.length"
            v-model="transferDialog">
            <template #activator="{ on }">
              <card
                top
                v-on="on">
                <template #title>
                  <span class="primary--text">{{ $t('competitions.actions.transfer') }}</span>
                </template>
              </card>
            </template>
            <template #dialog>
              <app-bar
                :title="$t('competitions.actions.transfer')"
                small-only
                fixed>
                <template #bar-left-actions>
                  <app-link @click="transferDialog = false">{{ $t('terms.actions.cancel') }}</app-link>
                </template>
              </app-bar>
              <page-body>
                <card-group>
                  <card
                    v-for="(location, i) in transferableLocations"
                    :key="location.id"
                    :top="i === 0"
                    :bottom="i === transferableLocations.length - 1"
                    @click="transfer(location.id)">
                    <template #title>
                      <v-list-item-avatar>
                        <v-img :src="getLocationThumbnail(location)"/>
                      </v-list-item-avatar>
                      {{ location.name }}
                    </template>
                  </card>
                </card-group>
              </page-body>
            </template>
          </responsive-dialog>
          <card
            :top="!transferableLocations.length"
            bottom
            @click="removePopup = true">
            <template #title>
              <span class="error--text">{{ $t('competitions.actions.remove') }}</span>
            </template>
          </card>
        </card-group>
      </div>
    </template>
  </responsive-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import CompetitionForm from '@/views/competitions/CompetitionForm'
import { getLocationThumbnail } from '@/utils/assets'
import { getCompetitionLocation } from '@/utils/competitions'

export default {
  name: 'CompetitionEdit',
  model: {
    prop: 'active',
    event: 'change'
  },
  props: {
    active: Boolean,
    competition: {
      type: Object,
      default: () => {}
    },
    solo: Boolean
  },
  components: { CompetitionForm },
  data() {
    return {
      form: {},

      dialog: false,
      transferDialog: false,
      removePopup: false
    }
  },
  mounted() {
    this.quit()
  },
  computed: {
    ...mapState(['locations']),
    transferableLocations() {
      if (this.competition.location !== undefined) return this.locations.filter(location => location.id !== this.location.id)
      else return []
    },
    location() {
      if (this.competition.location !== undefined) return getCompetitionLocation(this.competition.location)
      else return {}
    }
  },
  methods: {
    ...mapActions(['updateCompetition', 'transferCompetition', 'removeCompetition']),
    getLocationThumbnail,
    transfer(location) {
      this.transferCompetition({
        type: 'location',
        location,
        competition: this.competition.id
      })
      this.transferDialog = false
      this.validate()
    },
    remove() {
      this.removeCompetition(this.competition.id)
      this.$router.push({ name: 'competitions' })
    },
    validate() {
      this.updateCompetition(this.form)
      this.quit()
    },
    reset(competition) {
      this.form = Object.assign({}, competition)
    },
    quit() {
      this.reset(this.competition)
      this.dialog = false
    },
  },
  watch: {
    dialog(value) {
      this.$emit('change', value)
    },
    active(value) {
      this.dialog = value
    },
    competition(value) {
      this.reset(value)
    }
  }
}
</script>
