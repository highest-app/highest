<template>
  <v-main>
    <v-dialog
      v-model="removeDialog"
      max-width="290"
      persistent>
      <v-card>
        <v-card-title class="headline">{{ $t('terms.actionConfirmation') }}</v-card-title>
        <v-card-text>{{ $t('competitions.actions.removeConfirmation') }}</v-card-text>
        <v-card-actions>
          <v-btn
            text
            @click="removeDialog = false">
            {{ $t('terms.actions.cancel') }}
          </v-btn>
          <v-spacer/>
          <v-btn
            color="error"
            text
            @click="remove">
            {{ $t('terms.actions.remove') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <template v-if="editMode">
      <app-bar
        :title="$t('competitions.actions.edit')"
        small-only>
        <template #bar-left-actions>
          <a @click="resetEdit()">{{ $t('terms.actions.cancel') }}</a>
        </template>
        <template #bar-right-actions>
          <a @click="validateEdit">{{ $t('terms.actions.ok') }}</a>
        </template>
      </app-bar>
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="6"/>
          <v-col
            cols="12"
            md="6">
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
                        <a @click="transferDialog = false">{{ $t('terms.actions.cancel') }}</a>
                      </template>
                    </app-bar>
                    <page-body>
                      <card
                        v-for="location in transferableLocations"
                        :key="location.id"
                        @click="transfer(location.id)">
                        <template #title>
                          <v-list-item-avatar>
                            <v-img :src="getLocationThumbnail(location)"/>
                          </v-list-item-avatar>
                          {{ location.name }}
                        </template>
                      </card>
                    </page-body>
                  </template>
                </responsive-dialog>
                <card
                  :top="!transferableLocations.length"
                  bottom
                  @click="removeDialog = true">
                  <template #title>
                    <span class="error--text">{{ $t('competitions.actions.remove') }}</span>
                  </template>
                </card>
              </card-group>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </template>
    <template v-else>
      <app-bar
        :title="competition.name"
        small-only>
        <template #bar-left-actions>
          <a @click="$router.back()">{{ $t('terms.actions.back') }}</a>
        </template>
        <template #bar-right-actions>
          <a @click="editMode = true">{{ $t('terms.actions.edit') }}</a>
        </template>
      </app-bar>
      <v-container>
        <v-row>
          <v-col
            style="height: 500px"
            cols="12"
            md="6">
            <rich-map v-model="location.address"/>
          </v-col>
          <v-col
            cols="12"
            md="6">
            <h1>{{ competition.name }}</h1>
            <span class="overline list-description--text">
              <v-icon color="list-description">mdi-map-marker-outline</v-icon>
              <template v-if="location.type === 'location'">{{ location.name }} &mdash;</template>
              {{ location.address }}
            </span>
            <p>{{ competition.description }}</p>
            <span class="primary--text">{{ dateToText(competition.date) }}</span>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-main>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import CompetitionForm from '@/views/competitions/CompetitionForm'
import RichMap from '@/views/locations/RichMap'
import { getLocationThumbnail } from '@/utils/assets'

export default {
  name: 'Competition',
  components: { RichMap, CompetitionForm },
  data () {
    return {
      form: {},

      editMode: false,
      transferDialog: false,
      removeDialog: false,
    }
  },
  mounted() {
    this.resetEdit()
  },
  computed: {
    ...mapState(['locations']),
    ...mapGetters(['getCompetitionById', 'getLocationById']),
    competition() {
      return this.getCompetitionById(this.$route.params.competition)
    },
    location() {
      let location = {
        type: this.competition.location.type
      }
      if (location.type === 'string') {
        location = {
          type: 'string',
          address: this.competition.location.address
        }
      } else if (location.type === 'location') {
        location = {
          ...location,
          ...this.getLocationById(this.competition.location.locationID)
        }
      } else {
        // TODO : error handling
      }
      return location
    },
    transferableLocations() {
      return this.locations.filter(location => location.id !== this.location.id)
    }
  },
  methods: {
    ...mapActions(['updateCompetition', 'transferCompetition', 'removeCompetition']),
    getLocationThumbnail,
    resetEdit() {
      this.form = Object.assign({}, this.competition)
      this.editMode = false
    },
    validateEdit() {
      this.updateCompetition(this.form)
      this.resetEdit()
    },
    transfer(location) {
      this.transferCompetition({
        type: 'location',
        location,
        competition: this.competition.id
      })
      this.transferDialog = false
      this.validateEdit()
    },
    remove() {
      this.removeCompetition(this.competition.id)
      this.$router.push({ name: 'competitions' })
    }
  }
}
</script>
