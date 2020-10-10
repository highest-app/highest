<template>
  <div class="select-menu">
    <app-bar
      v-if="!solo"
      :title="name"
      small-only
      sticky>
      <template #bar-left-actions>
        <a @click="$emit('back')">{{ $t('terms.actions.back') }}</a>
      </template>
    </app-bar>
    <page-body>
      <card-group>
        <v-list
          class="pa-0"
          flat>
          <v-list-item-group
            v-model="selected"
            :multiple="multiple"
            :mandatory="value !== '' && value !== [] && mandatory"
            @change="select">
            <template v-for="(choice, i) in choices">
              <v-list-item
                :key="`${choice}--list-item)`"
                :value="choice"
                class="pl-2">
                <template
                  #default="{ active, toggle }"
                  @click="toggle">
                  <v-list-item-content>
                    <v-list-item-title>
                      <slot
                        name="label"
                        v-bind:label="labels ? labels[i] : choice ">
                        {{ labels ? labels[i] : choice }}
                      </slot>
                    </v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-icon
                    v-if="active"
                    class="my-3">
                    <v-icon

                      color="primary">mdi-check</v-icon>
                  </v-list-item-icon>
                </template>
              </v-list-item>
              <v-divider
                v-if="i !== choices.length - 1"
                :key="`${choice}--divider)`"/>
            </template>
          </v-list-item-group>
        </v-list>
      </card-group>
    </page-body>
  </div>
</template>

<script>
import AppBar from '../AppBar'

export default {
  name: 'SelectMenu',
  components: {
    AppBar
  },
  model: { prop: 'value' },
  props: {
    autoBack: Boolean,
    choices: {
      type: Array,
      required: true
    },
    labels: Array,
    mandatory: Boolean,
    multiple: Boolean,
    name: String,
    solo: Boolean,
    value: [String, Array]
  },
  data() {
    return {
      selected: this.value
    }
  },
  methods: {
    select() {
      this.$emit('input', this.selected)
      if (this.autoBack) this.$emit('back')
    }
  }
}
</script>
