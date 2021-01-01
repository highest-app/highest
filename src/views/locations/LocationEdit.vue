<template>
  <responsive-dialog v-model="dialog">
    <template #activator="{ on }">
      <slot
        name="activator"
        v-bind:on="on"/>
    </template>
    <template #dialog>
      <app-bar
        :title="$t('locations.actions.edit')"
        small-only
        fixed>
        <template #bar-left-actions>
          <app-link @click="quit">{{ $t('terms.actions.cancel') }}</app-link>
        </template>
        <template #bar-right-actions>
          <app-link @click="validate">{{ $t('terms.actions.ok') }}</app-link>
        </template>
      </app-bar>
      <location-form v-model="form">
        <template #append>
          <div class="px-4">
            <asset-uploader
              v-model="form.photos"
              :active="assetsDialog"
              :preview-image="getLocationThumbnail(location)"
              title="locations.actions.editAssets"
              multiple/>
          </div>
        </template>
      </location-form>
    </template>
  </responsive-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import LocationForm from '@/views/locations/LocationForm'
import { getLocationThumbnail } from '@/utils/assets'

export default {
  name: 'LocationEdit',
  model: {
    prop: 'active',
    event: 'change'
  },
  props: {
    active: Boolean,
    location: {
      type: Object,
      default: () => {}
    },
    solo: Boolean
  },
  components: { LocationForm },
  data() {
    return {
      form: {},
      assetsDialog: false,
      dialog: false
    }
  },
  mounted() {
    this.quit()
  },
  methods: {
    ...mapActions(['updateLocation']),
    getLocationThumbnail,
    validate() {
      this.updateLocation(this.form)
      this.quit()
    },
    quit() {
      this.form = Object.assign({}, this.location)
      this.dialog = false
    },
  },
  watch: {
    dialog(value) {
      this.$emit('change', value)
    },
    active(value) {
      this.dialog = value
    },
    location(value) {
      this.resetForm(value)
    }
  }
}
</script>
