<template>
  <div class="competition-form">
    <v-slide-x-reverse-transition>
      <panel
        v-if="locationSelect"
        :hook="hook"
        :page="!dialog"
        :dialog="dialog">
        <select-menu
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
      </panel>
    </v-slide-x-reverse-transition>
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
          v-if="withLocation"
          @click="locationSelect = true">
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
  </div>
</template>

<script>
import { competitionIcons as icons } from '@/utils/data'
import { mapState } from 'vuex'

export default {
  name: 'CompetitonForm',
  model: {
    prop: 'form',
    event: 'input'
  },
  props: {
    form: {
      type: Object,
      required: true
    },
    withLocation: {
      type: Boolean,
      default: false
    },
    dialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      locationSelect: false,
      icons
    }
  },
  computed: {
    ...mapState(['locations']),
    hook() {
      return this.dialog ? this.$parent.$parent.$parent.$refs.dialog : this.$parent.$refs.content
    }
  },
}
</script>
