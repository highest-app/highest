<template>
  <div style="height: 500px">
    <span
      v-if="!hideName"
      class="text-h4">
      <v-icon left>mdi-map-marker-outline</v-icon>{{ location.name }}</span>
    <p>{{ location.notes }}</p>
    <rich-map :location="location.address"/>
  </div>
</template>

<script>
import RichMap from '@/views/locations/RichMap'

export default {
  components: { RichMap },
  props: {
    location: {
      type: Object,
      default: () => {}
    },
    hideName: Boolean
  }
}
</script>
