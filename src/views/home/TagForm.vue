<template>
  <component
    :is="edit ? 'card-group' : 'div'"
    style="margin: 0 !important">
    <card
      :sharp="!edit"
      :top="edit">
      <template #input>
        <v-text-field
          v-model="form.name"
          :placeholder="tagName(computedForm)"
          hide-details
          solo
          flat
          @keydown.enter="executeAction"/>
      </template>
      <template #action>
        <v-btn
          :aria-label="$t('tags.add')"
          icon
          color="primary"
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
              :aria-label="$t('tags.ariaColor', { color: $t(`terms.colors.${tag.color}`)})"
              icon
              @click="toggle">
              <v-icon :color="tag.color">{{ active ? 'mdi-check-circle' : 'mdi-circle' }}</v-icon>
            </v-btn>
          </v-item>
        </v-item-group>
      </template>
    </card>
  </component>
</template>

<script>
import { mapActions } from 'vuex'
import { defaultTags } from '@/utils/data'
import tagName from '@/utils/tags'

export default {
  name: 'TagForm',
  props: {
    tag: {
      type: Object,
      default: () => {}
    },
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
    if (this.edit) {
      this.form.name = this.tag.name
      this.form.color = defaultTags.map(tag => tag.color).indexOf(this.tag.color)
    }
  },
  computed: {
    computedForm() {
      return {
        name: this.form.name,
        color: defaultTags.map(tag => tag.color)[this.form.color],
        id: this.edit && this.tag.id
      }
    }
  },
  methods: {
    ...mapActions(['addTag', 'updateTag']),
    tagName,
    executeAction() {
      this.add ? this.addTag(this.computedForm) : this.updateTag(this.computedForm)
      this.form.name = ''
      this.form.color = 0
      this.$emit('close')
    }
  },
}
</script>
