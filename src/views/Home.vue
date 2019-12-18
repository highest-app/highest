<template>
  <v-container>
    <v-row wrap>
      <v-col
        cols="12"
        md="6">
        <v-card>
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
          <v-col
            cols="12"
            class="pt-0">
            <adding-menu label="Ajouter un flux">
              <v-row/>
            </adding-menu>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AddingMenu from '@/components/AddingMenu'

export default {
  name: 'Home',
  components: {
    AddingMenu
  }
}
</script>
