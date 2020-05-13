<template>
  <v-col
    :class="{ background }"
    cols="12"
    :md="half ? 6 : 12">
    <v-card
      elevation="0"
      tile>
      <v-card-text>
        <span
          v-if="title !== null"
          class="subtitle-1 white--text mb-1">
          <v-icon
            v-if="icon !== null"
            left>
            {{ icon }}
          </v-icon>
          {{ $t(title) }}
        </span>
        <slot/>
        <v-row
          v-if="route !== null"
          class="mx-0">
          <v-spacer/>
          <v-btn
            icon
            :to="route">
            <v-icon color="primary">mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: 'Widget',
  props: {
    background: {
      type: Boolean,
      default: false
    },
    half: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    route: {
      type: String,
      default: null
    }
  }
}
</script>
