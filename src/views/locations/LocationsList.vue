<template>
  <div>
    <v-col
      v-for="location in locations"
      :key="location.id"
      cols="12"
      md="6">
      <v-card
        elevation="0"
        :to="'/locations/' + location.id">
        <v-img
          class="white--text align-end"
          :aspect-ratio="16/9"
          :src="location.photos[0]">
          <v-card-title>{{ location.name }}</v-card-title>
        </v-img>
      </v-card>
    </v-col>
  </div>
</template>

<script>
export default {
  name: 'LocationsList',
  props: {
    locations: {
      type: Array,
      required: true
    }
  }
}
</script>
