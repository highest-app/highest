<template>
  <v-card class="background">
    <v-card-text
      class="location-adding-menu pa-0"
      style="overflow-x: hidden;">
      <app-bar
        :title="$t('locations.add')"
        small-only
        fixed>
        <template #bar-left-actions>
          <a @click="close">{{ $t('terms.cancel') }}</a>
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
          <card>
            <template #title>{{ $t('terms.picture') }}</template>
            <template #input>
              <v-text-field
                v-model="form.picture"
                :placeholder="$t('terms.picturePlaceholder')"
                hide-details
                solo
                flat/>
            </template>
            <template #description>
              {{ $t('terms.pictureDescription') }}
              <a href="https://imgur.com">Imgur</a>
            </template>
          </card>
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
    </v-card-text>
  </v-card>
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
