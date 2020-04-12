<template>
  <div class="responsive-dialog">
    <template v-if="$vuetify.breakpoint.mdAndUp">
      <v-dialog
        v-model="active"
        :max-width="dialogWidth"
        class="responsive-dialog__dialog">
        <v-card class="background">
          <v-card-text
            class="location-adding-menu pa-0"
            style="overflow-x: hidden;">
            <slot name="dialog"/>
          </v-card-text>
        </v-card>
      </v-dialog>
      <div
        class="responsive-dialog__trigger">
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
        inset>
        <template #activator="{ on }">
          <div
            class="responsive-dialog__trigger"
            v-on="on">
            <slot
              name="activator"
              v-bind:on="events"/>
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
        click: this.activate
      }
    }
  },
  methods: {
    activate () {
      this.active = true
      this.$emit('change', true)
    }
  }
}
</script>
