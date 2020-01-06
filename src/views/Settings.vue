<template>
  <v-content>
    <app-bar title="Paramètres"/>
    <div class="page-body">
      <v-dialog
        v-model="eraseDialog"
        max-width="290"
        persistent>
        <v-card>
          <v-card-title class="headline">Êtes-vous sûr ?</v-card-title>
          <v-card-text>
            Si vous continuez, cette action va engendrer la perte de toutes vos données, incluant
            vos lieux, voies et paramètres, et ce de manière définitive. Réfléchissez-bien !
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
          <span class="list__header">Affichage</span>
          <v-list class="list--full">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Thème sombre</v-list-item-title>
              </v-list-item-content>
              <v-spacer/>
              <v-switch
                v-model="settings.darkTheme"
                class="pt-0 mt-0"
                color="primary"
                hide-details
                inset/>
            </v-list-item>
            <v-divider/>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Thème sombre automatique</v-list-item-title>
              </v-list-item-content>
              <v-spacer/>
              <v-switch
                v-model="settings.autoDarkTheme"
                class="pt-0 mt-0"
                color="primary"
                hide-details
                inset/>
            </v-list-item>
          </v-list>
          <p class="list__description">Le thème s'ajustera à celui de l'appareil. Assurez-vous d'avoir mis à jour votre système afin de profiter de cette fonction.</p>
        </v-col>
        <v-col cols="12">
          <span class="list__header">Données</span>
          <v-list class="list--full">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="primary--text">
                  Exporter les données
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider/>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="primary--text">
                  Importer les données
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider/>
            <v-list-item @click.stop="eraseDialog = true">
              <v-list-item-content>
                <v-list-item-title class="error--text">Effacer les données</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="12">
          <span class="list__header">À propos</span>
          <v-list class="list--full">
            <v-list-item>
              <p class="mb-0">
                Créé par
                <a
                  href="https://twitter.com/exybore"
                  target="_blank">
                  Exybore
                </a>
              </p>
            </v-list-item>
            <v-list-item
              href="https://github.com/exybore/climbing-app"
              target="_blank">
              <v-list-item-content>
                <v-list-item-title class="primary--text">Accéder au code source</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </div>
  </v-content>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Settings',
  data: () => ({
    settings: {},
    eraseDialog: false
  }),
  mounted () { this.settings = this.getSettings },
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
