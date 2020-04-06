<template>
  <div class="responsive-dialog">
    <template v-if="$vuetify.breakpoint.mdAndUp">
      <v-dialog
        v-model="value"
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
        class="responsive-dialog__trigger"
        @click="value = true">
        <slot name="activator"/>
      </div>
    </template>
    <v-bottom-sheet
      v-else
      v-model="value"
      class="responsive-dialog__sheet"
      scrollable
      inset>
      <template #activator="{ on }">
        <div
          class="responsive-dialog__trigger"
          v-on="on">
          <slot name="activator"/>
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
  </div>
</template>

<script>
export default {
  name: 'ResponsiveDialog',
  props: {
    value: Boolean,
    dialogWidth: {
      type: String,
      default: '50%'
    }
  }
}
</script>
