<template>
  <v-content>
    <app-bar title="Paramètres"/>
    <v-container class="px-0">
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
          <span class="grey--text caption">APPARENCE</span>
          <v-card
            tile
            elevation="0">
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Thème sombre</v-list-item-title>
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
          <span class="grey--text caption">AVANCÉ</span>
          <v-card
            tile
            elevation="0">
            <v-list>
              <v-list-item @click.stop="eraseDialog = true">
                <v-list-item-content>
                  <v-list-item-title class="error--text">Effacer les données</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="12">
          <span class="grey--text caption">À PROPOS</span>
          <v-card
            tile
            elevation="0">
            <v-list>
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
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AppBar from '@/components/AppBar'

export default {
  name: 'Settings',
  components: {
    AppBar,
  },
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
