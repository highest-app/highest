<template>
  <v-slide-x-reverse-transition>
    <panel
      v-if="enabled"
      :hook="$parent.$parent.$parent.$refs.dialog"
      disable-offset
      dialog>
      <app-bar
        :title="$t('tags.manage')"
        small-only
        sticky>
        <template #bar-left-actions>
          <a @click="$emit('change', false)">{{ $t('terms.actions.ok') }}</a>
        </template>
      </app-bar>
      <v-container>
        <v-dialog
          v-model="editDialog"
          max-width="290">
          <tag-form
            v-if="editDialog"
            :name="form.name"
            :color="form.color"
            :tagId="form.id"
            edit
            @close="editDialog = false"/>
        </v-dialog>
        <v-dialog
          v-model="resetDialog"
          max-width="290"
          persistent>
          <v-card>
            <v-card-title class="headline">{{ $t('terms.actionConfirmation') }}</v-card-title>
            <v-card-text>{{ $t('tags.resetConfirmation') }}</v-card-text>
            <v-card-actions>
              <v-btn
                text
                @click="resetDialog = false">
                {{ $t('terms.actions.cancel') }}
              </v-btn>
              <v-spacer/>
              <v-btn
                color="error"
                text
                @click="executeReset">
                {{ $t('terms.actions.reset') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <card-group>
          <card
            icon="mdi-tag-plus-outline"
            icon-color="primary"
            top
            :bottom="!addingCard">
            <template #title>
              <span>{{ $t('tags.add') }}</span>
            </template>
            <template #action>
              <v-btn
                icon
                @click="addingCard = !addingCard">
                <v-icon>
                  {{ addingCard ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                </v-icon>
              </v-btn>
            </template>
          </card>
          <template v-if="addingCard">
            <tag-form
              add
              @close="addingCard = false"/>
          </template>
        </card-group>
        <v-list class="background">
          <v-list-item
            v-for="tag in tags"
            :key="tag.id">
            <v-list-item-content>
              <v-list-item-title>
                <v-icon :color="tag.color">mdi-circle</v-icon>&nbsp;
                {{ tag.default ? $t(`terms.colors.${tag.color}`) : tag.name }}
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-row class="mx-0">
                <v-tooltip
                  open-delay="500"
                  bottom>
                  <template #activator="{ on }">
                    <v-btn
                      color="primary"
                      icon
                      v-on="on"
                      @click="edit(tag)">
                      <v-icon>mdi-pencil-outline</v-icon>
                    </v-btn>
                  </template>
                  <span>{{ $t('tags.update') }}</span>
                </v-tooltip>
                <v-tooltip
                  open-delay="500"
                  bottom>
                  <template #activator="{ on }">
                    <v-btn
                      color="error"
                      icon
                      v-on="on"
                      @click="removeTag(tag.id)">
                      <v-icon>mdi-delete-outline</v-icon>
                    </v-btn>
                  </template>
                  <span>{{ $t('tags.remove') }}</span>
                </v-tooltip>
              </v-row>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <card-group>
          <card
            top
            bottom
            @click="resetDialog = true">
            <template #title>
              <span class="error--text">{{ $t('tags.reset') }}</span>
            </template>
          </card>
        </card-group>
      </v-container>
    </panel>
  </v-slide-x-reverse-transition>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { defaultTags } from '@/utils/data'
import TagForm from '@/views/home/TagForm'

export default {
  name: 'TagsManaging',
  components: { TagForm },
  model: { prop: 'enabled', event: 'change' },
  props: {
    enabled: Boolean
  },
  data() {
    return {
      addingCard: false,
      form: {
        name: '',
        color: 0,
        id: ''
      },
      defaultTags,

      editDialog: false,
      resetDialog: false
    }
  },
  computed: mapState(['tags']),
  methods: {
    ...mapActions(['removeTag', 'resetTags']),
    edit(tag) {
      this.form.name = tag.name
      this.form.color = tag.color
      this.form.id = tag.id
      this.editDialog = true
    },
    executeReset() {
      this.resetTags()
      this.resetDialog = false
    }
  }
}
</script>
