<template>
  <div class="select-menu">
    <app-bar
      v-if="!solo"
      :title="name"
      small-only
      sticky>
      <template #bar-left-actions>
        <app-link @click="$emit('back')">{{ $t('terms.actions.back') }}</app-link>
      </template>
    </app-bar>
    <page-body>
      <component
        :is="list ? 'list-group' : 'card-group'"
        :class="{ 'mx-0': solo }">
        <v-item-group
          v-model="selected"
          :multiple="multiple"
          :mandatory="value !== '' && value !== [] && mandatory"
          @change="select">
          <v-item
            v-for="(choice, i) in choices"
            #default="{ active, toggle }"
            :key="choice"
            :value="choice">
            <card
              :top="!i"
              :bottom="i === choices.length - 1"
              @click="toggle">
              <template #title>
                <slot
                  name="label"
                  v-bind:label="labels ? labels[i] : choice">
                  {{ labels ? labels[i] : choice }}
                </slot>
              </template>
              <template
                v-if="active"
                #action>
                <v-icon color="primary">mdi-check</v-icon>
              </template>
            </card>
          </v-item>
        </v-item-group>
      </component>
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
    list: Boolean,
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
