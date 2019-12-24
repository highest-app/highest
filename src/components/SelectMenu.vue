<template>
  <div>
    <app-bar
      :title="name"
      small-only
      fixed>
      <template #bar-left-actions>
        <span
          class="primary--text"
          @click="$emit('back')">
          Retour
        </span>
      </template>
    </app-bar>
    <v-container class="px-0">
      <v-card
        tile
        elevation="0">
        <v-list>
          <v-list-item-group
            v-model="selected"
            mandatory>
            <template v-for="(item, i) in choices">
              <v-list-item
                :key="`${item}--list-item)`"
                :value="item">
                <template
                  v-slot:default="{ active, toggle }"
                  @click="toggle">
                  <v-list-item-content>
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-icon v-if="active">
                    <v-icon color="primary">mdi-check</v-icon>
                  </v-list-item-icon>
                </template>
              </v-list-item>
              <v-divider
                v-if="i !== choices.length - 1"
                :key="`${item}--divider)`"/>
            </template>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import AppBar from '@/components/AppBar'

export default {
  components: {
    AppBar
  },
  model: {
    prop: 'selected',
    event: 'change'
  },
  props: {
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
    }
  },
  watch: {
    selected () {
      this.$emit('change', this.selected)
    }
  }
}
</script>
