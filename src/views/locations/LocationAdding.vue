<template>
  <responsive-dialog v-model="enabled">
    <template #activator="{ on }">
      <v-icon
        :aria-label="$t('locations.actions.add')"
        small
        v-on="on">
        mdi-plus
      </v-icon>
    </template>
    <template #dialog>
      <app-bar
        :title="$t('locations.actions.add')"
        small-only
        fixed>
        <template #bar-left-actions>
          <app-link @click="resetForm">{{ $t('terms.actions.cancel') }}</app-link>
        </template>
        <template #bar-right-actions>
          <app-link
            :disable="!valid"
            bold
            @click="add">
            {{ $t('terms.actions.add') }}
          </app-link>
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
  data() {
    return {
      form: Object.assign({}, defaultLocationForm),

      valid: false,
      enabled: false
    }
  },
  mounted() {
    this.resetForm()
  },
  methods: {
    ...mapActions(['addLocation']),
    async add() {
      let id = await this.addLocation(this.form)
      await this.$router.push({
        name: 'location',
        params: { location: id }
      })
      this.resetForm()
    },
    resetForm() {
      this.form = Object.assign({}, this.defaultLocationForm)
      this.enabled = false
    },
  }
}
</script>
