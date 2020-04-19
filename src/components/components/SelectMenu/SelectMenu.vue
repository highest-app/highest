<template>
  <v-theme-provider root>
    <div
      :style="style"
      class="select-menu">
      <app-bar
        :title="name"
        small-only
        fixed>
        <template #bar-left-actions>
          <a @click="$emit('back')">{{ $t('terms.back') }}</a>
        </template>
      </app-bar>
      <v-container class="px-0 pb-0">
        <v-row>
          <v-col cols="12">
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
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-theme-provider>
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
    },
    page: {
      type: Boolean,
      default: false
    },
    dialog: {
      type: Boolean,
      default: false
    },
    hook: {
      type: Object,
      default: undefined
    },
    height: {
      type: String,
      default: null
    },
    width: {
      type: String,
      default: null
    }
  },
  computed: {
    defaultHeight() {
      return this.hook === undefined ? this.height : this.hook.offsetHeight
    },
    defaultWidth() {
      return this.hook === undefined ? this.width : this.hook.offsetWidth
    },
    style() {
      let style = ''
      if (this.page) {
        style += `top: 0; height: ${this.defaultHeight}px;`
        if (this.$vuetify.breakpoint.mdAndUp) {
          // Ignoring the drawer on PC
          style += `left: 256px; width: ${this.defaultWidth - 256}px;`
        } else {
          style += `left: 0; width: ${this.defaultWidth}px;`
        }
      } else if (this.dialog) {
        style += `width: ${this.defaultWidth}px; height: ${this.defaultHeight}px; margin-top: -75px;`
      }
      return style
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
