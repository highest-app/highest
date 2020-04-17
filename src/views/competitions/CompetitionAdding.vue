<template>
  <responsive-dialog v-model="enabled">
    <template #activator="{ on: dialog }">
      <v-tooltip
        open-delay="500"
        bottom>
        <template #activator="{ on: tooltip }">
          <v-btn
            class="gradient--secondary"
            elevation="0"
            fab
            small
            v-on="{ ...dialog, ...tooltip }">
            <v-icon color="white">mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('competitions.add') }}</span>
      </v-tooltip>
    </template>
    <template #dialog>
      <select-menu
        v-if="locationSelect"
        v-model="form.location"
        :choices="locations.map(l => l.id)"
        :labels="locations"
        :name="$tc('generic.location')"
        auto-back
        @back="locationSelect = false">
        <template #label="{ label }">
          <v-list-item-avatar>
            <v-avatar>
              <v-img :src="label.photos[0]"/>
            </v-avatar>
          </v-list-item-avatar>
          {{ label.name }}
        </template>
      </select-menu>
      <template v-else>
        <app-bar
          :title="$t('competitions.add')"
          small-only
          fixed>
          <template #bar-left-actions>
            <a @click="resetForm">{{ $t('terms.cancel') }}</a>
          </template>
          <template #bar-right-actions>
            <a @click="add">{{ $t('terms.add') }}</a>
          </template>
        </app-bar>
        <page-body>
          <list-group>
            <card top>
              <template #title>{{ $t('terms.name') }}</template>
              <template #input>
                <v-text-field
                  v-model="form.name"
                  :placeholder="$t('competitions.namePlaceholder')"
                  hide-details
                  solo
                  flat/>
              </template>
            </card>
            <card @click="locationSelect = true">
              <template #title>{{ $tc('generic.location') }}</template>
              <template
                v-if="form.location !== '' && form.location !== undefined"
                #action-text>
                {{ locations.find(l => l.id === form.location).name }}
              </template>
              <template #action>
                <v-list-item-icon>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </template>
            </card>
            <card>
              <template #title>{{ $t('terms.description') }}</template>
              <template #input>
                <v-textarea
                  id="notes-textarea"
                  v-model="form.description"
                  :placeholder="$t('competitions.descriptionPlaceholder')"
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
              <template #title>{{ $t('competitions.participation') }}</template>
              <template #action>
                <v-btn-toggle
                  v-model="form.participation"
                  mandatory>
                  <v-tooltip
                    v-for="icon in icons"
                    :key="icon.icon"
                    open-delay="500"
                    bottom>
                    <template #activator="{ on }">
                      <v-btn v-on="on">
                        <v-icon :color="icon.color">{{ icon.icon }}</v-icon>
                      </v-btn>
                    </template>
                    <span>{{ $t(`competitions.${icon.name}`)}}</span>
                  </v-tooltip>
                </v-btn-toggle>
              </template>
            </card>
          </list-group>
        </page-body>
      </template>
    </template>
  </responsive-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { competitionIcons as icons } from '@/utils/data'
import { defaultCompetitionForm } from '@/utils/forms'

export default {
  name: 'CompetitionAdding',
  data () {
    return {
      form: Object.assign({}, defaultCompetitionForm),

      enabled: false,
      locationSelect: false,

      icons
    }
  },
  computed: {
    ...mapState(['locations'])
  },
  methods: {
    ...mapActions(['addCompetition']),
    async add () {
      switch (this.form.participation) {
      case 0:
        this.form.participation = 'notParticipating'
        break
      case 1:
        this.form.participation = 'thinking'
        break
      case 2:
        this.form.participation = 'participating'
        break
      }
      this.form.location = {
        type: 'location',
        id: this.form.location
      }
      let id = await this.addCompetition(this.form)
      await this.$router.push({
        name: 'competition',
        params: {
          competition: id
        }
      })
    },
    resetForm () {
      this.form = Object.assign({}, this.defaultCompetitionForm)
      this.enabled = false
    }
  }
}
</script>
