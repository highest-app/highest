<template>
  <div>
    <card :top="edit">
      <template #input>
        <v-text-field
          v-model="form.name"
          :placeholder="$t('terms.fields.name')"
          hide-details
          solo
          flat/>
      </template>
      <template #action>
        <v-btn
          :aria-label="$t('tags.add')"
          :disabled="form.name === ''"
          icon
          @click="executeAction">
          <v-icon>{{ add ? 'mdi-plus' : 'mdi-check' }}</v-icon>
        </v-btn>
      </template>
    </card>
    <card bottom>
      <template #title>
        <v-item-group
          v-model="form.color"
          mandatory>
          <v-item
            v-for="tag in defaultTags"
            :key="tag.id"
            #default="{ active, toggle }">
            <v-btn
              icon
              @click="toggle">
              <v-icon :color="tag.color">{{ active ? 'mdi-check-circle' : 'mdi-circle' }}</v-icon>
            </v-btn>
          </v-item>
        </v-item-group>
      </template>
    </card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { defaultTags } from '@/utils/data'

export default {
  name: 'TagForm',
  props: {
    name: {
      type: String,
      default: ''
    },
    color: String,
    tagId: String,
    add: Boolean,
    edit: Boolean
  },
  data() {
    return {
      form: {
        name: '',
        color: 0
      },
      defaultTags
    }
  },
  mounted() {
    this.form.name = this.name
    this.form.color = defaultTags.map(tag => tag.color).indexOf(this.color)
  },
  methods: {
    ...mapActions(['addTag', 'updateTag']),
    executeAction() {
      this.add ? this.addTag(this.computedForm) : this.updateTag(this.computedForm)
      this.form.name = ''
      this.form.color = 0
      this.$emit('close')
    }
  },
  computed: {
    computedForm() {
      return {
        name: this.form.name,
        color: defaultTags.map(tag => tag.color)[this.form.color],
        id: this.tagId
      }
    }
  }
}
</script>
