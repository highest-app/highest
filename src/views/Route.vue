<template>
  <v-content>
    <template v-if="editMode">
      <app-bar
        :title="$t('routes.edit')"
        small-only>
        <template #bar-right-actions>
          <a @click="validateEdit">{{ $t('terms.ok') }}</a>
        </template>
      </app-bar>
    </template>
    <template v-else>
      <app-bar
        :title="route.name"
        small-only>
        <template #bar-left-actions>
          <a @click="$router.back()">{{ $t('terms.back') }}</a>
        </template>
        <template #bar-right-actions>
          <a @click="editMode = true">{{ $t('terms.edit') }}</a>
        </template>
      </app-bar>
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="6">
            <v-carousel
              v-if="route.photos.length > 0"
              :continuous="false"
              height="auto"
              hide-delimiters>
              <v-carousel-item
                v-for="photo in route.photos"
                :key="photo">
                <v-img :src="photo"/>
              </v-carousel-item>
            </v-carousel>
          </v-col>
          <v-col
            cols="12"
            md="6">
            <p>{{ route.notes }}</p>
            <v-switch
              v-model="route.finished"
              color="primary"
              :label="$t('routes.markAsFinished')"
              inset
              @click.stop="switchFinishedRoute(route.id)"/>
            <v-list class="background">
              <v-divider/>
              <template
                v-for="(progression, i) in route.progressions">
                <v-list-item :key="`${progression.date}-${i}-0`">
                  <v-list-item-content>
                    <v-list-item-title>{{ dateToText(progression.date) }}</v-list-item-title>
                    <p class="mb-0 paragraph--text">{{ progression.notes }}</p>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn
                      icon
                      @click="removeProgression({
                        route: route.id,
                        notes: progression.notes
                      })">
                      <v-icon color="red darken-4">mdi-delete-outline</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
                <v-divider :key="`${progression.date}-${i}-1`"/>
              </template>
            </v-list>
            <responsive-dialog>
              <template #activator>
                <v-btn block>{{ $t('routes.addProgress') }}</v-btn>
              </template>
              <template #dialog>
                <app-bar
                  :title="$t('routes.addProgress')"
                  small-only
                  fixed>
                  <template #bar-right-actions>
                    <a @click="progressionAdd">{{ $t('terms.add') }}</a>
                  </template>
                </app-bar>
                <page-body>
                  <list-group>
                    <card top>
                      <template #title>
                        <span class="primary--text">
                          {{ dateToText(progressionForm.date) }}
                        </span>
                      </template>
                    </card>
                    <card>
                      <template #title>
                        <v-date-picker
                          v-model="progressionForm.date"
                          style="box-shadow: 0;"
                          first-day-of-week="1"
                          color="primary"
                          :max="today"
                          no-title
                          full-width/>
                      </template>
                    </card>
                    <card bottom>
                      <template #title>{{ $t('terms.notes') }}</template>
                      <template #input>
                        <v-textarea
                          id="notes-textarea"
                          v-model="progressionForm.notes"
                          :placeholder="$t('routes.progressionNotesPlaceholder')"
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
            </responsive-dialog>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-content>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { defaultProgressionForm } from '@/utils/forms'
import { today, dateToText } from '@/utils/parsing'

export default {
  name: 'Route',
  data() {
    return {
      route: {},

      editMode: false,

      progressionForm: Object.assign({}, defaultProgressionForm),
      today
    }
  },
  mounted () {
    this.route = this.getRoute(this.$route.params.location, this.$route.params.route)
    if (this.route === undefined) {
      this.$router.back()
    }
  },
  computed: {
    ...mapGetters(['getRoute'])
  },
  methods: {
    ...mapActions(['deleteRoute', 'switchFinishedRoute', 'addProgression', 'removeProgression']),
    dateToText,
    delete () {
      this.deleteRoute(this.route.id)
      this.$router.back()
    },
    validateEdit () {
      this.editMode = false
    },
    progressionAdd () {
      this.addProgression({
        id: this.route.id,
        date: this.progressionForm.date,
        notes: this.progressionForm.notes
      })
      this.progressionForm = Object.assign({}, defaultProgressionForm)
    }
  }
}
</script>
