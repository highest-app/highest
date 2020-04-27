<template>
  <div class="select-menu">
    <app-bar
      :title="name"
      small-only
      sticky>
      <template #bar-left-actions>
        <a @click="$emit('back')">{{ $t('terms.actions.back') }}</a>
      </template>
    </app-bar>
    <page-body>
      <v-card
        tile
        elevation="0">
        <v-list flat>
          <v-list-item-group
            v-model="selected"
            :multiple="multiple">
            <template v-for="(choice, i) in choices">
              <v-list-item
                :key="`${choice}--list-item)`"
                :value="choice"
                active-class="null">
                <template
                  #default="{ active, toggle }"
                  @click="toggle">
                  <v-list-item-content>
                    <v-list-item-title>
                      <slot
                        name="label"
                        v-bind:label="labels === null ? choice : labels[i]">
                        {{ labels === null ? choice : labels[i] }}
                      </slot>
                    </v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-icon v-if="active">
                    <v-icon color="primary">mdi-check</v-icon>
                  </v-list-item-icon>
                </template>
              </v-list-item>
              <v-divider
                v-if="i !== choices.length - 1"
                :key="`${choice}--divider)`"/>
            </template>
          </v-list-item-group>
        </v-list>
      </v-card>
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
  model: {
    prop: 'selected',
    event: 'change'
  },
  props: {
    labels: {
      type: Array,
      default: null
    },
    choices: {
      type: Array,
      required: true
    },
    selected: {
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: 'Choisir'
    },
    autoBack: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    selected () {
      this.$emit('change', this.selected)
      if (this.autoBack) this.$emit('back')
    }
  }
}
</script>
