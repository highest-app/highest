<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Paramètres</h1>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-list
            two-line
            subheader>
            <v-subheader>Apparence</v-subheader>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Thème sombre</v-list-item-title>
                <v-list-item-subtitle>Donne à l'application des composants sombres, utiles pour économiser de l'énergie ou améliorer le confort de lecture</v-list-item-subtitle>
              </v-list-item-content>
              <v-spacer/>
              <v-switch
                v-model="settings.darkTheme"
                color="primary"
                inset/>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Settings',
  data: () => ({
    settings: {}
  }),
  mounted () {
    this.settings = this.getSettings
  },
  computed: {
    ...mapGetters(['getSettings'])
  },
  methods: {
    ...mapActions(['updateSettings']),
  },
  watch: {
    settings: {
      handler (value) {
        this.updateSettings(value)
      },
      deep: true
    }
  }
}
</script>
