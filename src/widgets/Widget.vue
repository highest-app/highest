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
          v-if="title"
          class="subtitle-1 text--primary mb-1">
          <v-icon
            v-if="icon"
            left>
            {{ icon }}
          </v-icon>
          {{ $t(title) }}
        </span>
        <slot/>
        <v-row
          v-if="route"
          class="mx-0">
          <v-spacer/>
          <v-btn
            :aria-label="$t('widgets.helps.details', { widget: $t(title) })"
            text
            color="primary"
            :to="route">
            {{ $t('terms.actions.more') }}
            <v-icon right>
              mdi-chevron-right
            </v-icon>
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
    background: Boolean,
    half: Boolean,

    title: String,
    icon: String,
    route: String
  }
}
</script>
