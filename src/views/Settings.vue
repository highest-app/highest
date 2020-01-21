<template>
  <v-content>
    <app-bar title="Paramètres"/>
    <page-body>
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
      <list-group>
        <card-header>Affichage</card-header>
        <card top>
          <template #title>Thème sombre</template>
          <template #action>
            <v-switch
              v-model="settings.darkTheme"
              class="pt-0 mt-0"
              color="primary"
              hide-details
              inset/>
          </template>
        </card>
        <card bottom>
          <template #title>Thème sombre automatique</template>
          <template #action>
            <v-switch
              v-model="settings.autoDarkTheme"
              class="pt-0 mt-0"
              color="primary"
              hide-details
              inset/>
          </template>
          <template #description>Le thème s'ajustera à celui de l'appareil. Assurez-vous d'avoir mis à jour votre système afin de profiter de cette fonction.</template>
        </card>
      </list-group>

      <list-group>
        <card-header>Données</card-header>
        <card top>
          <template #title>
            <span class="primary--text">Exporter les données</span>
          </template>
        </card>
        <v-divider/>
        <card>
          <template #title>
            <span class="primary--text">Importer les données</span>
          </template>
        </card>
        <v-divider/>
        <card
          clickable
          bottom
          @click.native="eraseDialog = true">
          <template #title>
            <span class="error--text">Effacer les données</span>
          </template>
        </card>
      </list-group>

      <list-group>
        <card-header>À propos</card-header>
        <card>
          <template #title>
            <p>
              Créé par
              <a
                href="https://twitter.com/exybore"
                target="_blank">
                Exybore
              </a>
            </p>
            <a
              href="https://github.com/exybore/climbing-app"
              target="_blank"
              class="primary--text">
              Accéder au code source
            </a>
          </template>
        </card>
      </list-group>
    </page-body>
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
