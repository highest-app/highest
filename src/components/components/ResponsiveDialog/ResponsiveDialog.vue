<template>
  <div class="responsive-dialog">
    <template v-if="$vuetify.breakpoint.mdAndUp">
      <v-dialog
        :value="active"
        :max-width="dialogWidth"
        :fullscreen="fullscreen"
        :persistent="persistent"
        :scrollable="dialogHeight !== 'auto'"
        content-class="responsive-dialog__dialog"
        @update:return-value="disable">
        <v-card
          class="background"
          :style="{ height: dialogHeight }">
          <v-card-text
            class="pa-0"
            style="overflow-x: hidden;">
            <slot name="dialog"/>
          </v-card-text>
        </v-card>
      </v-dialog>
    </template>
    <template v-else>
      <v-bottom-sheet
        :value="active"
        :fullscreen="fullscreen"
        :persistent="persistent"
        class="responsive-dialog__sheet"
        scrollable
        inset
        @update:return-value="disable">
        <v-card class="background">
          <v-card-text
            class="location-adding-menu pa-0"
            style="overflow-x: hidden;">
            <slot name="dialog"/>
          </v-card-text>
        </v-card>
      </v-bottom-sheet>
    </template>
    <slot
      name="activator"
      v-bind:on="events"/>
  </div>
</template>

<script>
export default {
  name: 'ResponsiveDialog',
  model: {
    prop: 'active',
    event: 'change'
  },
  props: {
    active: Boolean,
    dialogWidth: {
      type: String,
      default: '50%'
    },
    dialogHeight: {
      type: String,
      default: 'auto'
    },
    fullscreen: Boolean,
    persistent: Boolean
  },
  data() {
    return {
      events: {
        click: this.enable
      }
    }
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
