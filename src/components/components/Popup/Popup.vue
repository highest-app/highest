<template>
  <v-dialog
    :value="active"
    :persistent="!nonPersistent"
    max-width="300"
    @update:return-value="disable">
    <v-card class="popup text-center">
      <v-card-title class="headline text-center d-block">
        <slot name="title">
          {{ $t('terms.actionConfirmation') }}
        </slot>
      </v-card-title>
      <v-card-text class="text-center">
        <slot name="description"/>
      </v-card-text>
      <v-card-actions v-if="$slots['left-action'] !== null">
        <app-link
          block
          bold
          @click="$listeners['left-action'] === undefined ? disable() : $emit('left-action')">
          {{ $t(leftText) }}
        </app-link>
        <v-divider vertical/>
        <app-link
          v-if="rightText !== null"
          :critical="critical"
          block
          bold
          @click="$emit('right-action')">
          {{ $t(rightText) }}
        </app-link>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'Popup',
  model: {
    prop: 'active',
    event: 'change'
  },
  props: {
    active: Boolean,
    nonPersistent: Boolean,
    leftText: {
      type: String,
      default: 'terms.actions.cancel'
    },
    rightText: {
      type: String,
      default: null
    },
    critical: Boolean
  },
  methods: {
    enable() {
      this.$emit('change', true)
    },
    disable() {
      this.$emit('change', false)
    }
  }
}
</script>
