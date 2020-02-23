<template>
  <v-content>
    <app-bar :title="$t('pages.home')">
      <template #top-bar-actions>
        <v-bottom-sheet
          v-model="profileSheet"
          scrollable
          inset>
          <template v-slot:activator="{ on }">
            <v-btn
              color="secondary"
              elevation="0"
              fab
              small
              v-on="on">
              <v-icon>
                mdi-account-outline
              </v-icon>
            </v-btn>
          </template>
          <v-card class="background">
            <v-card-text
              class="pa-0"
              style="overflow-x: hidden;">
              <app-bar
                :title="$t('pages.profile')"
                small-only
                fixed>
                <template #bar-right-actions>
                  <a @click="profileSheet = false">{{ $t('terms.ok') }}</a>
                </template>
              </app-bar>
              <page-body>
                <list-group>
                  <card to="/settings">
                    <template #title>{{ $t('pages.settings') }}</template>
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
              <div>{{ $t('home.appSubtitle') }}</div>
              <p class="display-1 text--primary">Highest</p>
              <div class="text--primary">{{ $t('home.appDescription') }}</div>
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
