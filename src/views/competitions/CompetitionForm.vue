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
            <v-list-item-avatar class="my-0">
              <v-avatar>
                <v-img :src="getLocationThumbnail(label)"/>
              </v-avatar>
            </v-list-item-avatar>
            {{ label.name }}
          </template>
        </select-menu>
      </panel>
    </v-slide-x-reverse-transition>
    <page-body>
      <card-group>
        <card top>
          <template #input>
            <v-text-field
              v-model="form.name"
              :placeholder="$t('terms.fields.name')"
              hide-details
              solo
              flat/>
          </template>
        </card>
        <card :bottom="!withLocation">
          <template #input>
            <v-textarea
              id="notes-textarea"
              v-model="form.description"
              :placeholder="$t('terms.fields.description')"
              rows="1"
              auto-grow
              hide-details
              solo
              flat/>
          </template>
        </card>
        <card
          v-if="withLocation"
          bottom
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
      </card-group>
      <card-group>
        <card
          icon="mdi-clock-outline"
          icon-color="blue"
          top>
          <template #title>
            <span>{{ $t('terms.fields.date') }}</span>
            <br><span class="font-weight-light primary--text">{{ dateToText(form.goal) }}</span>
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
        <card
          icon="mdi-account-plus-outline"
          icon-color="green"
          bottom>
          <template #title>{{ $t('competitions.terms.participation') }}</template>
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
                <span>{{ $t(`competitions.status.${icon.name}`)}}</span>
              </v-tooltip>
            </v-btn-toggle>
          </template>
        </card>
      </card-group>
    </page-body>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getLocationThumbnail } from '@/utils/assets'
import { competitionIcons as icons } from '@/utils/data'

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
    withLocation: Boolean,
    dialog: Boolean
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
      return this.dialog ? this.$parent.$parent.$parent.$refs.dialog : this.$parent.$refs.main
    }
  },
  methods: { getLocationThumbnail },
  watch: {
    form: {
      handler (value) {
        if (value.location && value.name) this.$emit('valid')
        else this.$emit('unvalid')
      },
      deep: true
    }
  }
}
</script>
