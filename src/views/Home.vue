<template>
  <v-content>
    <app-bar title="Climbing">
      <template #top-bar-actions>
        <v-bottom-sheet
          v-model="profileSheet"
          scrollable
          inset>
          <template v-slot:activator="{ on }">
            <v-btn
              :dark="!$vuetify.theme.dark"
              :light="$vuetify.theme.dark"
              elevation="0"
              fab
              small
              v-on="on">
              <v-icon
                :dark="$vuetify.theme.dark"
                :light="!$vuetify.theme.dark">
                mdi-account-outline
              </v-icon>
            </v-btn>
          </template>
          <v-card class="background">
            <v-card-text
              class="pa-0"
              style="overflow-x: hidden;">
              <app-bar
                title="Profil"
                small-only
                fixed>
                <template #bar-right-actions>
                  <a @click="profileSheet = false">OK</a>
                </template>
              </app-bar>
              <page-body>
                <list-group>
                  <card to="/settings">
                    <template #title>Paramètres</template>
                    <template #action>
                      <v-list-item-icon>
                        <v-icon>mdi-chevron-right</v-icon>
                      </v-list-item-icon>
                    </template>
                  </card>
                </list-group>
              </page-body>
            </v-card-text>
          </v-card>
        </v-bottom-sheet>
      </template>
    </app-bar>
    <v-container>
      <v-row wrap>
        <v-col
          cols="12"
          md="6">
          <v-card
            elevation="0"
            tile>
            <v-card-text>
              <div>Votre app d'escalade</div>
              <p class="display-1 text--primary">
                Climbing
              </p>
              <div class="text--primary">
                Travaillez vos voies en restant organisé : l'application d'escalade pratique !
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          md="6">
          <v-row>
            <v-col cols="12"/>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      profileSheet: false
    }
  }
}
</script>
