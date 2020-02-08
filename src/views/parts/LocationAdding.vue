<template>
  <div class="location-adding-menu">
    <app-bar
      title="Ajouter un lieu"
      small-only
      fixed>
      <template #bar-left-actions>
        <a @click="close">Annuler</a>
      </template>
      <template #bar-right-actions>
        <a @click="add">Ajouter</a>
      </template>
    </app-bar>
    <page-body>
      <list-group>
        <card top>
          <template #title>Nom</template>
          <template #input>
            <v-text-field
              v-model="form.name"
              placeholder="Nom du lieu"
              hide-details
              solo
              flat/>
          </template>
        </card>
        <card>
          <template #title>Image</template>
          <template #input>
            <v-text-field
              v-model="form.picture"
              placeholder="URL vers l'image"
              hide-details
              solo
              flat/>
          </template>
          <template #description>
            Pour ajouter une image au lieu, vous pouvez utiliser des services gratuits d'hébergement d'images comme
            <a href="https://imgur.com">Imgur</a>
          </template>
        </card>
        <card
          top
          bottom>
          <template #title>Notes</template>
          <template #input>
            <v-textarea
              id="notes-textarea"
              v-model="form.notes"
              placeholder="Notes à rajouter à propos du lieu"
              rows="1"
              auto-grow
              hide-details
              solo
              flat/>
          </template>
        </card>
      </list-group>
    </page-body>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { defaultLocationForm } from '@/utils/forms'

export default {
  name: 'LocationAdding',
  data () {
    return {
      form: Object.assign({}, defaultLocationForm),
    }
  },
  mounted () {
    this.resetForm()
  },
  methods: {
    ...mapActions(['addLocation']),
    resetForm () {
      this.form = Object.assign({}, this.defaultLocationForm)
    },
    add () {
      this.addLocation(this.form)
      this.resetForm()
      this.$emit('close')
    },
    close () {
      this.resetForm()
      this.$emit('close')
    }
  }
}
</script>
