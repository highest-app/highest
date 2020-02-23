<template>
  <v-content>
    <app-bar :title="$tc('generic.route', 2)">
      <template #top-bar-actions>
        <v-bottom-sheet
          v-model="routeAddingSheet"
          scrollable
          inset>
          <template v-slot:activator="{ on }">
            <v-btn
              color="secondary"
              elevation="0"
              fab
              small
              v-on="on">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <v-card class="background">
            <v-card-text
              class="pa-0"
              style="overflow-x: hidden;">
              <select-menu
                v-if="gradeSelect"
                v-model="routeForm.grade"
                :choices="grades"
                :name="$t('terms.grade')"
                auto-back
                @back="gradeSelect = false"/>
              <select-menu
                v-else-if="locationSelect"
                v-model="routeForm.location"
                :choices="Object.keys(parsedLocations)"
                :name="$tc('generic.location', 1)"
                auto-back
                @back="locationSelect = false"/>
              <template v-else>
                <app-bar
                  :title="$t('routes.add')"
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
                          v-model="routeForm.name"
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
                      <template #action-text>{{ routeForm.location }}</template>
                      <template #action>
                        <v-list-item-icon>
                          <v-icon>mdi-chevron-right</v-icon>
                        </v-list-item-icon>
                      </template>
                    </card>
                    <card
                      class="select-menu__trigger"
                      clickable
                      @click.native="gradeSelect = true">
                      <template #title>
                        {{ $t('terms.grade') }}
                      </template>
                      <template #action-text>
                        {{ routeForm.grade }}
                      </template>
                      <template #action>
                        <v-list-item-icon>
                          <v-icon>mdi-chevron-right</v-icon>
                        </v-list-item-icon>
                      </template>
                    </card>
                    <card bottom>
                      <template #title>{{ $t('terms.length') }}</template>
                      <template #input>
                        <v-slider
                          v-model="routeForm.length"
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
                      :bottom="!routeForm.enableGoal">
                      <template #title>{{ $t('routes.defineGoal') }}</template>
                      <template #action>
                        <v-switch
                          v-model="routeForm.enableGoal"
                          class="mt-0 pt-0"
                          color="primary"
                          hide-details
                          inset/>
                      </template>
                    </card>
                    <template v-if="routeForm.enableGoal">
                      <card>
                        <template #title>
                          <span class="primary--text">
                            {{ dateToText(routeForm.goal) }}
                          </span>
                        </template>
                      </card>
                      <card bottom>
                        <template #title>
                          <v-date-picker
                            v-if="routeForm.enableGoal"
                            v-model="routeForm.goal"
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
                          v-model="routeForm.notes"
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
            </v-card-text>
          </v-card>
        </v-bottom-sheet>
      </template>
    </app-bar>
    <page-body>
      <div class="hidden-sm-and-up">
        <list-group>
          <h2>{{ $tc('generic.location', 2) }}</h2>
          <v-bottom-sheet
            v-model="locationAddingSheet"
            scrollable
            inset>
            <template v-slot:activator="{ on }">
              <v-col
                cols="12"
                md="6">
                <v-card
                  elevation="0"
                  v-on="on">
                  <v-card-title>{{ $t('locations.add') }}</v-card-title>
                </v-card>
              </v-col>
            </template>
            <v-card class="background">
              <LocationAdding @close="locationAddingSheet = false"/>
            </v-card>
          </v-bottom-sheet>
          <v-col
            v-for="location in locations"
            :key="location.id"
            cols="12"
            md="6">
            <v-card
              elevation="0"
              :to="'/locations/' + location.id">
              <v-img
                class="white--text align-end"
                :aspect-ratio="16/9"
                :src="location.photos[0]">
                <v-card-title>{{ location.name }}</v-card-title>
              </v-img>
            </v-card>
          </v-col>
        </list-group>
        <list-group>
          <h2>{{ $tc('generic.tag', 2) }}</h2>
          <v-list
            class="background"
            elevation="0">
            <template v-for="(tag, i) in tags">
              <v-list-item
                :key="`${tag.name}--list-item`"
                :to="`/tags/${tag.id}`"
                link>
                <v-list-item-icon>
                  <v-icon :color="tag.color">mdi-circle</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ $t(`terms.${tag.color}`) }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider
                v-if="i !== tags.length - 1"
                :key="`${tag.name}--divider`"
                inset/>
            </template>
          </v-list>
        </list-group>
      </div>
      <list-group
        v-for="location in locations"
        :key="location.id">
        <h2>{{ location.name }}</h2>
        <routes-list :routes="routes[location.id]"/>
      </list-group>
    </page-body>
  </v-content>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { grades, tags } from '@/utils/data'
import { defaultRouteForm } from '@/utils/forms'
import { dateToText } from '@/utils/parsing'
import LocationAdding from '@/views/parts/LocationAdding'

export default {
  name: 'Routes',
  components: { LocationAdding },
  data () {
    return {
      locations: [],
      parsedLocations: {},
      routes: {},
      routeForm: Object.assign({}, defaultRouteForm),

      routeAddingSheet: false,
      locationAddingSheet: false,
      gradeSelect: false,
      locationSelect: false,

      grades,
      tags
    }
  },
  mounted () {
    this.locations = this.getLocations
    this.locations.forEach((location) => {
      this.parsedLocations[location.name] = location.id
    })
    this.refreshRoutes()
  },
  computed: {
    ...mapGetters(['getLocations', 'getRoutesByLocation', 'getLocationById']),
    routeLength () {
      return `${this.routeForm.length}m`
    }
  },
  methods: {
    ...mapActions(['addRoute']),
    dateToText,
    add () {
      this.routeForm.location = this.parsedLocations[this.routeForm.location]
      if (!this.routeForm.enableGoal) this.routeForm.goal = false
      this.addRoute(this.routeForm)
      this.resetForm()
      this.refreshRoutes()
    },
    resetForm () {
      this.routeForm = Object.assign({}, this.defaultRouteForm)
      this.routeAddingSheet = false
      this.gradeSelect = false
      this.locationSelect = false
    },
    refreshRoutes () {
      this.routes = {}
      this.locations.forEach(location => {
        this.routes[location.id] = this.getRoutesByLocation(location.id)
      })
    }
  }
}
</script>

<style>
#notes-textarea {
  margin-top: 0;
}
</style>
