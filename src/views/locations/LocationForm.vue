<template>
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
      <card
        bottom
        extendable>
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
        <template
          v-if="adding"
          #description>
          <v-icon left>
            mdi-lightbulb-outline
          </v-icon>
          {{ $t('locations.assetsTip')}}
        </template>
      </card>
    </list-group>
  </page-body>
</template>

<script>
export default {
  name: 'LocationForm',
  model: {
    prop: 'form',
    event: 'input'
  },
  props: {
    form: {
      type: Object,
      required: true
    },
    adding: {
      type: Boolean,
      default: false
    }
  }
}
</script>
