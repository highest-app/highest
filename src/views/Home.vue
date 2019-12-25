<template>
  <v-content>
    <app-bar title="Climbing"/>
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
import AppBar from '@/components/AppBar'

export default {
  name: 'Home',
  components: { AppBar }
}
</script>
