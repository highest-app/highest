<template>
  <div class="responsive-dialog">
    <template v-if="$vuetify.breakpoint.mdAndUp">
      <v-dialog
        v-model="active"
        :max-width="dialogWidth"
        class="responsive-dialog__dialog"
        @click:outside="disable">
        <v-card class="background">
          <v-card-text
            class="pa-0"
            style="overflow-x: hidden;">
            <slot name="dialog"/>
          </v-card-text>
        </v-card>
      </v-dialog>
      <div class="responsive-dialog__trigger">
        <slot
          name="activator"
          v-bind:on="events"/>
      </div>
    </template>
    <template v-else>
      <v-bottom-sheet
        v-model="active"
        class="responsive-dialog__sheet"
        scrollable
        inset
        @click:outside="disable">
        <template #activator="{ on: sheet }">
          <div class="responsive-dialog__trigger">
            <slot
              name="activator"
              v-bind:on="{ ...sheet, ...events }"/>
          </div>
        </template>
        <v-card class="background">
          <v-card-text
            class="location-adding-menu pa-0"
            style="overflow-x: hidden;">
            <slot name="dialog"/>
          </v-card-text>
        </v-card>
      </v-bottom-sheet>
    </template>
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
    active: {
      type: Boolean,
      default: false
    },
    dialogWidth: {
      type: String,
      default: '50%'
    }
  },
  data () {
    return {
      events: {
        click: this.enable
      }
    }
  },
  methods: {
    enable () {
      this.$emit('change', true)
      this.$emit('enable')
    },
    disable() {
      this.$emit('change', false)
      this.$emit('disable')
    }
  }
}
</script>
