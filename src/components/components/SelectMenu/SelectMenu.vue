<template>
  <div>
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
              <v-list-item-group v-model="selected">
                <template v-for="(choice, i) in choices">
                  <v-list-item
                    :key="`${choice}--list-item)`"
                    :value="choice"
                    active-class="null">
                    <template
                      v-slot:default="{ active, toggle }"
                      @click="toggle">
                      <v-list-item-content>
                        <v-list-item-title>{{ labels === null ? choice : labels[i] }}</v-list-item-title>
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
