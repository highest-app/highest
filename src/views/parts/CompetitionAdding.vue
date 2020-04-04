<template>
  <v-card class="background">
    <select-menu
      v-if="locationSelect"
      v-model="form.location"
      :choices="Object.keys(locations)"
      :name="$tc('generic.location')"
      auto-back
      @back="locationSelect = false"/>
    <template v-else>
      <app-bar
        :title="$t('competitions.add')"
        small-only
        fixed>
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
          <card
            clickable
            @click.native="locationSelect = true">
            <template #title>{{ $tc('generic.location') }}</template>
            <template #action-text>{{ form.location }}</template>
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
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
import { competitionIcons as icons } from '@/utils/data'
import { defaultCompetitionForm } from '@/utils/forms'
import { dateToText } from '@/utils/parsing'

export default {
  name: 'CompetitionAdding',
  props: {
    locations: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      form: Object.assign({}, defaultCompetitionForm),

      locationSelect: false,

      icons
    }
  },
  methods: {
    ...mapActions(['addCompetition']),
    dateToText,
    add () {
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
        value: this.locations[this.form.location]
      }
      this.addCompetition(this.form)
      this.form = Object.assign({}, this.defaultCompetitionForm)
      this.$emit('close')
    }
  }
}
</script>
