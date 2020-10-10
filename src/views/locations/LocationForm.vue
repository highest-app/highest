<template>
  <page-body>
    <card-group>
      <card top>
        <template #input>
          <v-text-field
            v-model="form.name"
            :placeholder="$t('terms.fields.name')"
            hide-details
            solo
            flat/>
        </template>
      </card>
      <card>
        <template #input>
          <v-text-field
            v-model="form.address"
            :placeholder="$t('terms.fields.address')"
            hide-details
            solo
            flat/>
        </template>
      </card>
      <card
        bottom
        extendable>
        <template #input>
          <v-textarea
            id="notes-textarea"
            v-model="form.notes"
            :placeholder="$t('terms.fields.notes')"
            rows="1"
            auto-grow
            hide-details
            solo
            flat/>
        </template>
      </card>
    </card-group>
    <template
      v-if="adding">
      <div class="px-3">
        <v-icon left>
          mdi-lightbulb-outline
        </v-icon>
        {{ $t('locations.form.assetsTip')}}
      </div>
    </template>
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
    adding: Boolean
  },
  watch: {
    form: {
      handler(value) {
        if (value.name && value.address) this.$emit('valid')
        else this.$emit('unvalid')
      },
      deep: true
    }
  }
}
</script>
