<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="6" v-for="location in locations" :key="location.name">
        <v-card :to="'/locations/'+location.id">
          <v-img
            class="white--text align-end"
            :aspect-ratio="16/9"
            :src="location.photos[0]"
          >
            <v-card-title>{{location.name}}</v-card-title>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Locations',
  data: () => ({
    locations: {}
  }),
  computed: {
    ...mapGetters(['getLocations'])
  },
  mounted () {
    this.locations = this.getLocations
  }
}
</script>

<style scoped>

</style>