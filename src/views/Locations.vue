<template>
  <main>
    <app-bar title="Lieux"/>
    <v-content>
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <adding-menu label="Ajouter un lieu">
              <v-row>
                <v-col
                  cols="12"
                  md="6"
                  class="pb-0">
                  <v-text-field
                    v-model="form.name"
                    label="Nom"/>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                  class="pb-0">
                  <v-text-field
                    v-model="form.photo"
                    label="Lien vers une photo"/>
                </v-col>
                <v-col
                  cols="12"
                  class="pt-0">
                  <v-textarea
                    v-model="form.notes"
                    label="Notes"/>
                </v-col>
                <v-col cols="12">
                  <v-btn
                    color="primary"
                    block
                    text
                    @click="addLocation(form)">
                    Ajouter
                  </v-btn>
                </v-col>
              </v-row>
            </adding-menu>
          </v-col>
          <v-col
            v-for="location in locations"
            :key="location.name"
            cols="12"
            md="6">
            <v-card :to="'/locations/' + location.id">
              <v-img
                class="white--text align-end"
                :aspect-ratio="16/9"
                :src="location.photos[0]">
                <v-card-title>{{ location.name }}</v-card-title>
              </v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AddingMenu from '@/components/AddingMenu'
import AppBar from '@/components/AppBar'

export default {
  name: 'Locations',
  components: { AddingMenu, AppBar },
  data: () => ({
    locations: {},
    form: {}
  }),
  mounted () {
    this.clearForm()
    this.locations = this.getLocations
  },
  computed: {
    ...mapGetters(['getLocations'])
  },
  methods: {
    ...mapActions(['addLocation']),
    clearForm () {
      this.form = {
        name: '',
        photo: '',
        notes: ''
      }
    }
  }
}
</script>
