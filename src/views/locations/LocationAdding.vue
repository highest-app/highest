<template>
  <responsive-dialog v-model="enabled">
    <template #activator="{ on }">
      <v-list-item
        class="gradient--secondary"
        v-on="on">
        <v-list-item-icon>
          <v-icon color="white">mdi-plus</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="white--text">{{ $t('terms.actions.add') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
    <template #dialog>
      <app-bar
        :title="$t('locations.actions.add')"
        small-only
        fixed>
        <template #bar-left-actions>
          <a @click="resetForm">{{ $t('terms.actions.cancel') }}</a>
        </template>
        <template #bar-right-actions>
          <a
            v-if="valid"
            @click="add">
            {{ $t('terms.actions.add') }}
          </a>
          <span
            v-else
            class="gray--text">
            {{ $t('terms.actions.add') }}
          </span>
        </template>
      </app-bar>
      <location-form
        v-model="form"
        adding
        @valid="valid = true"
        @unvalid="valid = false"/>
    </template>
  </responsive-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import { defaultLocationForm } from '@/utils/forms'
import LocationForm from '@/views/locations/LocationForm'

export default {
  name: 'LocationAdding',
  components: { LocationForm },
  data () {
    return {
      form: Object.assign({}, defaultLocationForm),

      valid: false,
      enabled: false
    }
  },
  mounted () {
    this.resetForm()
  },
  methods: {
    ...mapActions(['addLocation']),
    async add () {
      let id = await this.addLocation(this.form)
      await this.$router.push({
        name: 'location',
        params: { location: id }
      })
      this.resetForm()
    },
    resetForm () {
      this.form = Object.assign({}, this.defaultLocationForm)
      this.enabled = false
    },
  }
}
</script>
