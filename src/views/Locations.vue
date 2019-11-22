<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-list>
            <v-list-group
              prepend-icon="mdi-plus"
              :value="false"
            >
              <template v-slot:activator>
                <v-list-item-title>Ajouter un lieu</v-list-item-title>
              </template>

              <v-list-item>
                <v-row>
                  <v-col cols="12" md="6" class="pb-0">
                    <v-text-field
                      v-model="form.name"
                      label="Nom"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" class="pb-0">
                    <v-text-field
                      v-model="form.photo"
                      label="Lien vers une photo"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="pt-0">
                    <v-textarea
                      v-model="form.notes"
                      label="Notes"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12">
                    <v-btn @click="add" color="primary" block>
                      Ajouter
                    </v-btn>
                  </v-col>
                </v-row>
              </v-list-item>
            </v-list-group>
          </v-list>
        </v-card>
      </v-col>
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
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'Locations',
  data: () => ({
    locations: {},

    form: {
      name: '',
      photo: ''
    }
  }),
  mounted () {
    this.locations = this.getLocations
  },
  computed: {
    ...mapGetters(['getLocations'])
  },
  methods: {
    ...mapActions(['addLocation']),
    add () {
      this.addLocation(this.form)
      this.locations = this.getLocations
    }
  }
}
</script>

<style scoped>

</style>