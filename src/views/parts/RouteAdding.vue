<template>
  <responsive-dialog>
    <template #activator>
      <v-btn
        color="secondary"
        elevation="0"
        fab
        small>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <template #dialog>
      <select-menu
        v-if="gradeSelect"
        v-model="form.grade"
        :choices="grades"
        :name="$t('terms.grade')"
        auto-back
        @back="gradeSelect = false"/>
      <select-menu
        v-else-if="locationSelect"
        v-model="form.location"
        :choices="Object.keys(parsedLocations)"
        :name="$tc('generic.location', 1)"
        auto-back
        @back="locationSelect = false"/>
      <template v-else>
        <app-bar
          :title="$t('routes.add')"
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
                  :placeholder="$t('routes.namePlaceholder')"
                  hide-details
                  solo
                  flat/>
              </template>
            </card>
            <card
              clickable
              @click.native="locationSelect = true">
              <template #title>{{ $tc('generic.location', 1) }}</template>
              <template #action-text>{{ form.location }}</template>
              <template #action>
                <v-list-item-icon>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </template>
            </card>
            <card
              clickable
              @click.native="gradeSelect = true">
              <template #title>
                {{ $t('terms.grade') }}
              </template>
              <template #action-text>
                {{ form.grade }}
              </template>
              <template #action>
                <v-list-item-icon>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </template>
            </card>
            <responsive-dialog dialog-width="300px">
              <template #activator>
                <card clickable>
                  <template #title>{{ $t('routes.color') }}</template>
                  <template #action-text>{{ form.color }}</template>
                  <template #action>
                    <v-list-item-icon>
                      <v-icon>mdi-chevron-right</v-icon>
                    </v-list-item-icon>
                  </template>
                </card>
              </template>
              <template #dialog>
                <app-bar
                  :title="$t('routes.color')"
                  small-only
                  fixed/>
                <v-row
                  justify="center"
                  align="center">
                  <v-color-picker
                    v-model="form.color"
                    style="max-width: 100%; border-radius: 0"
                    mode="hexa"
                    swatches-max-height="100%"
                    hide-mode-switch
                    show-swatches
                    flat/>
                </v-row>
              </template>
            </responsive-dialog>
            <card bottom>
              <template #title>{{ $t('terms.length') }}</template>
              <template #input>
                <v-slider
                  v-model="form.length"
                  class="align-center px-3"
                  :max="300"
                  :min="0"
                  hide-details/>
                <span class="subtitle-1">{{ routeLength }}</span>
              </template>
            </card>
          </list-group>
          <list-group>
            <card
              top
              :bottom="!form.enableGoal">
              <template #title>{{ $t('routes.defineGoal') }}</template>
              <template #action>
                <v-switch
                  v-model="form.enableGoal"
                  class="mt-0 pt-0"
                  color="primary"
                  hide-details
                  inset/>
              </template>
            </card>
            <template v-if="form.enableGoal">
              <card>
                <template #title>
                  <span class="primary--text">
                    {{ dateToText(form.goal) }}
                  </span>
                </template>
              </card>
              <card bottom>
                <template #title>
                  <v-date-picker
                    v-if="form.enableGoal"
                    v-model="form.goal"
                    style="box-shadow: 0;"
                    first-day-of-week="1"
                    color="primary"
                    no-title
                    full-width/>
                </template>
              </card>
            </template>
          </list-group>
          <list-group>
            <card
              top
              bottom>
              <template #title>{{ $t('terms.notes') }}</template>
              <template #input>
                <v-textarea
                  id="notes-textarea"
                  v-model="form.notes"
                  :placeholder="$t('routes.notesPlaceholder')"
                  rows="1"
                  auto-grow
                  hide-details
                  solo
                  flat/>
              </template>
            </card>
          </list-group>
        </page-body>
      </template>
    </template>
  </responsive-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { grades } from '@/utils/data'
import { defaultRouteForm } from '@/utils/forms'
import { dateToText } from '@/utils/parsing'

export default {
  name: 'RouteAdding',
  data () {
    return {
      locations: [],
      parsedLocations: {},
      form: Object.assign({}, defaultRouteForm),

      routeDialog: false,
      locationSelect: false,
      gradeSelect: false,

      grades
    }
  },
  mounted () {
    this.locations = this.getLocations
    this.locations.forEach((location) => {
      this.parsedLocations[location.name] = location.id
    })
  },
  computed: {
    ...mapGetters(['getLocations']),
    routeLength () {
      return `${this.form.length}m`
    }
  },
  methods: {
    ...mapActions(['addRoute']),
    dateToText,
    add () {
      this.form.location = this.parsedLocations[this.form.location]
      if (!this.form.enableGoal) this.form.goal = false
      this.addRoute(this.form)
      this.form = Object.assign({}, this.defaultRouteForm)
      this.$emit('close')
    }
  }
}
</script>
