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
          v-if="heading !== null"
          class="subtitle-1 white--text mb-1">
          <v-icon left>{{ heading.icon }}</v-icon>
          {{ $t(heading.title) }}
        </span>
        <slot/>
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
    heading: {
      type: Object,
      default: null
    },
  }
}
</script>
