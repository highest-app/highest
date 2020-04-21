<template>
  <div>
    <v-slide-x-reverse-transition>
      <panel
        v-if="tagsSelect"
        :hook="hook"
        :page="!dialog"
        :dialog="dialog">
        <select-menu
          v-model="form.tags"
          :labels="tags"
          :choices="tags.map(tag => tag.id)"
          :name="$tc('generic.tag', 2)"
          multiple
          @back="tagsSelect = false">
          <template #label="{ label }">
            <v-icon :color="label.color">
              mdi-circle
            </v-icon>
            {{ label.default ? $t(`terms.${label.color}`) : label.name }}
          </template>
        </select-menu>
      </panel>
      <panel
        v-if="gradeSelect"
        :hook="hook"
        :page="!dialog"
        :dialog="dialog">
        <select-menu
          v-model="form.grade"
          :choices="grades"
          :name="$t('terms.grade')"
          auto-back
          @back="gradeSelect = false"/>
      </panel>
      <panel
        v-if="locationSelect"
        :hook="hook"
        :page="!dialog"
        :dialog="dialog">
        <select-menu
          v-model="form.location"
          :choices="locations.map(l => l.id)"
          :labels="locations"
          :name="$tc('generic.location', 1)"
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
    <template>
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
            v-if="acceptLocation"
            @click="locationSelect = true">
            <template #title>{{ $tc('generic.location', 1) }}</template>
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
          <card @click="gradeSelect = true">
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
          <card @click="tagsSelect = true">
            <template #title>
              {{ $tc('generic.tag', 2) }}
            </template>
            <template #action-text>
              <v-icon
                v-for="tag in form.tags"
                :key="tag"
                :color="getTagById(tag).color">
                mdi-circle
              </v-icon>
            </template>
            <template #action>
              <v-list-item-icon>
                <v-icon>mdi-chevron-right</v-icon>
              </v-list-item-icon>
            </template>
          </card>
          <responsive-dialog
            v-model="colorDialog"
            dialog-width="300px">
            <template #activator="{ on }">
              <card v-on="on">
                <template #title>{{ $t('routes.color') }}</template>
                <template #action-text>
                  <v-icon :color="form.color">
                    mdi-square
                  </v-icon>
                </template>
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
                fixed>
                <template #bar-right-actions>
                  <a @click="colorDialog = false">{{ $t('terms.ok') }}</a>
                </template>
              </app-bar>
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
            bottom
            extendable>
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
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { grades } from '@/utils/data'

export default {
  name: 'RouteForm',
  model: {
    prop: 'form',
    event: 'input'
  },
  props: {
    form: {
      type: Object,
      required: true
    },
    acceptLocation: {
      type: Boolean,
      default: false
    },
    dialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      tagsSelect: false,
      colorDialog: false,
      locationSelect: false,
      gradeSelect: false,

      grades
    }
  },
  computed: {
    ...mapState(['tags', 'locations']),
    ...mapGetters(['getTagById']),
    routeLength () {
      return `${this.form.length}m`
    },
    hook() {
      return this.dialog ? this.$parent.$parent.$parent.$refs.dialog : this.$parent.$refs.content
    }
  },
}
</script>
