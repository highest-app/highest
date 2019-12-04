<template>
  <v-container>
    <v-dialog
      v-model="eraseDialog"
      max-width="290">
      <v-card>
        <v-card-title class="headline">Êtes-vous sûr ?</v-card-title>

        <v-card-text>
          Cette action va engendrer la perte de toutes vos données, et ce de manière définitive. Réfléchissez-bien !
        </v-card-text>
        <v-card-actions>
          <v-btn
            text
            @click="eraseDialog = false">
            Annuler
          </v-btn>
          <v-spacer/>
          <v-btn
            color="error"
            text
            @click="eraseData">
            Effacer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      <v-col cols="12">
        <v-card>
          <v-list
            two-line
            subheader>
            <v-subheader>Avancé</v-subheader>

            <v-list-item @click.stop="eraseDialog = true">
              <v-list-item-content>
                <v-list-item-title color="error-text">Effacer les données</v-list-item-title>
                <v-list-item-subtitle>Supprime toutes les données stockées sur cet appareil</v-list-item-subtitle>
              </v-list-item-content>
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
    settings: {},
    eraseDialog: false
  }),
  mounted () {
    this.settings = this.getSettings
  },
  computed: {
    ...mapGetters(['getSettings'])
  },
  methods: {
    ...mapActions(['updateSettings']),
    eraseData () {
      localStorage.removeItem('routes')
      localStorage.removeItem('locations')
      localStorage.removeItem('settings')
      window.location.reload()
    }
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
