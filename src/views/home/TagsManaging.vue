<template>
  <page-body>
    <v-dialog
      v-model="editDialog"
      max-width="290">
      <tag-form
        v-if="editDialog"
        :tag="form"
        edit
        @close="editDialog = false"/>
    </v-dialog>
    <popup
      v-model="resetPopup"
      right-text="terms.actions.reset"
      critical
      @right-action="executeReset">
      <template #description>{{ $t('tags.resetConfirmation') }}</template>
    </popup>
    <card-group>
      <card
        aria-haspopup="true"
        :bottom="!addingCard"
        icon="mdi-tag-plus-outline"
        icon-color="primary"
        top
        @click="addingCard = !addingCard">
        <template #title>
          <span>{{ $t('tags.add') }}</span>
        </template>
        <template #action>
          <v-icon color="primary">
            mdi-chevron-right <template v-if="addingCard">mdi-rotate-90</template>
          </v-icon>
        </template>
      </card>
      <v-slide-y-transition>
        <template v-if="addingCard">
          <tag-form
            add
            @close="addingCard = false"/>
        </template>
      </v-slide-y-transition>
    </card-group>
    <draggable
      v-if="tags.length"
      v-model="tags"
      draggable=".item"
      animation="200"
      tag="div"
      handle=".handle"
      class="v-list background v-sheet"
      @start="dragging = true"
      @end="dragging = false">
      <transition-group
        type="transition"
        :name="!dragging ? 'flip-list' : null">
        <v-list-item
          v-for="tag in tags"
          :key="tag.id"
          class="item">
          <v-list-item-action>
            <v-icon
              color="action-text"
              class="handle"
              style="cursor: grab">
              mdi-menu
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <v-icon :color="tag.color">mdi-circle</v-icon>&nbsp;
              {{ tagName(tag) }}
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-row class="mx-0">
              <v-tooltip
                open-delay="500"
                bottom>
                <template #activator="{ on }">
                  <v-btn
                    :aria-label="$t('tags.ariaUpdate', { tag: tagName(tag) })"
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
                    :aria-label="$t('tags.ariaRemove', { tag: tagName(tag) })"
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
      </transition-group>
    </draggable>
    <illustration
      v-else
      image="/img/illustrations/sort.svg"
      label="tags.any"/>
    <card-group>
      <card
        top
        bottom
        @click="resetPopup = true">
        <template #title>
          <span class="error--text">{{ $t('tags.reset') }}</span>
        </template>
      </card>
    </card-group>
  </page-body>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Draggable from 'vuedraggable'

import TagForm from '@/views/home/TagForm'

import { defaultTags } from '@/utils/data'
import tagName from '@/utils/tags'

export default {
  name: 'TagsManaging',
  components: { Draggable, TagForm },
  props: { value: Boolean },
  data() {
    return {
      addingCard: false,
      form: {
        name: '',
        color: 0,
        default: false,
        id: ''
      },
      defaultTags,

      dragging: false,
      editDialog: false,
      resetPopup: false
    }
  },
  computed: {
    ...mapState({
      storeTags: store => store.tags.data
    }),
    tags: {
      get() {
        return this.storeTags
      },
      set(value) {
        this.updateTags(value)
      }
    }
  },
  methods: {
    ...mapActions(['updateTags', 'removeTag', 'resetTags']),
    tagName,
    edit(tag) {
      this.form = tag
      this.editDialog = true
    },
    executeReset() {
      this.resetTags()
      this.resetPopup = false
    }
  }
}
</script>

<style lang="stylus">
.flip-list-move
  transition: transform 0.5s
</style>
