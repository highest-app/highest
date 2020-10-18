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
            {{ label.default ? $t(`terms.colors.${label.color}`) : label.name }}
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
          :name="$t('routes.terms.grade')"
          auto-back
          mandatory
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
          mandatory
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
    <template>
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
          <card
            bottom
            extendable>
            <template #input>
              <v-textarea
                id="notes-textarea"
                v-model="form.notes"
                :placeholder="$t('terms.fields.notes')"
                rows="1"
                auto-grow
                hide-details
                solo
                flat/>
            </template>
          </card>
        </card-group>
        <card-group>
          <card
            v-if="acceptLocation"
            icon="mdi-map-marker"
            icon-color="blue"
            @click="locationSelect = true">
            <template #title>{{ $tc('generic.location', 1) }}</template>
            <template
              v-if="form.location !== '' && form.location !== undefined"
              #action-text>
              {{ locations.find(l => l.id === form.location).name }}
            </template>
            <template #action>
              <v-list-item-icon aria-label="Select">
                <v-icon>mdi-chevron-right</v-icon>
              </v-list-item-icon>
            </template>
          </card>
          <card
            icon="mdi-ladder"
            icon-color="orange"
            @click="gradeSelect = true">
            <template #title>
              {{ $t('routes.terms.grade') }}
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
          <card bottom>
            <template #title>{{ $t('routes.terms.length') }}</template>
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
        </card-group>
        <card-group>
          <card
            icon="mdi-tag-outline"
            icon-color="green"
            @click="tagsSelect = true">
            <template #title>
              {{ $tc('generic.tag', 2) }}
            </template>
            <template #action-text>
              <span v-if="!form.tags.length">{{ $t('terms.quantity.none') }}</span>
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
              <card
                bottom
                v-on="on">
                <template #title>{{ $t('routes.terms.color') }}</template>
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
                :title="$t('routes.terms.color')"
                small-only
                fixed>
                <template #bar-right-actions>
                  <a @click="colorDialog = false">{{ $t('terms.actions.ok') }}</a>
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
        </card-group>
        <card-group>
          <card
            top
            icon="mdi-clock-outline"
            icon-color="red"
            :bottom="!form.enableGoal">
            <template #title>
              {{ $t('routes.form.defineGoal') }}
              <template v-if="form.enableGoal">
                <br><span class="font-weight-light primary--text">{{ dateToText(form.goal) }}</span>
              </template>
            </template>
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
            <card bottom>
              <template #title>
                <v-date-picker
                  v-model="form.goal"
                  style="box-shadow: 0;"
                  color="primary"
                  no-title
                  full-width/>
              </template>
            </card>
          </template>
        </card-group>
      </page-body>
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { grades } from '@/utils/data'
import { getLocationThumbnail } from '@/utils/assets'

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
    acceptLocation: Boolean,
    dialog: Boolean
  },
  data() {
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
    routeLength() {
      return `${this.form.length}m`
    },
    hook() {
      return this.dialog ? this.$parent.$parent.$parent.$refs.dialog : this.$parent.$refs.main
    }
  },
  methods: { getLocationThumbnail },
  watch: {
    form: {
      handler(value) {
        if ((value.location || !this.acceptLocation) && value.grade) this.$emit('valid')
        else this.$emit('unvalid')
      },
      deep: true
    }
  }
}
</script>
