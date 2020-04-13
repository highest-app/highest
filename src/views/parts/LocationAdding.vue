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
          <v-list-item-title class="white--text">{{ $t('terms.add') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
    <template #dialog>
      <app-bar
        :title="$t('locations.add')"
        small-only
        fixed>
        <template #bar-left-actions>
          <a @click="resetForm">{{ $t('terms.cancel') }}</a>
        </template>
        <template #bar-right-actions>
          <a @click="add">{{ $t('terms.add') }}</a>
        </template>
      </app-bar>
      <page-body>
        <list-group>
          <card top>
            <template #title>{{ $t('terms.name') }}</template>
            <template #input>
              <v-text-field
                v-model="form.name"
                :placeholder="$t('locations.namePlaceholder')"
                hide-details
                solo
                flat/>
            </template>
          </card>
          <card>
            <template #title>{{ $t('terms.address') }}</template>
            <template #input>
              <v-text-field
                v-model="form.address"
                :placeholder="$t('locations.addressPlaceholder')"
                hide-details
                solo
                flat/>
            </template>
          </card>
          <asset-uploader v-model="form.picture"/>
          <card
            top
            bottom>
            <template #title>{{ $t('terms.notes') }}</template>
            <template #input>
              <v-textarea
                id="notes-textarea"
                v-model="form.notes"
                :placeholder="$t('locations.notesPlaceholder')"
                rows="1"
                auto-grow
                hide-details
                solo
                flat/>
            </template>
          </card>
        </list-group>
      </page-body>
    </template>
  </responsive-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import { defaultLocationForm } from '@/utils/forms'
import AssetUploader from '@/views/parts/AssetUploader'

export default {
  name: 'LocationAdding',
  components: { AssetUploader },
  data () {
    return {
      form: Object.assign({}, defaultLocationForm),

      enabled: false
    }
  },
  mounted () {
    this.resetForm()
  },
  methods: {
    ...mapActions(['addLocation']),
    resetForm () {
      this.form = Object.assign({}, this.defaultLocationForm)
      this.enabled = false
    },
    add () {
      this.addLocation(this.form)
      this.resetForm()
      this.$emit('close')
    }
  }
}
</script>
