<template>
  <div>
    <v-list
      :class="{ background: mobile }"
      :dense="!mobile"
      :nav="!mobile"
      subheader>
      <v-subheader class="text-uppercase">
        <v-row class="mx-0">
          {{ $tc('generic.location', 2) }} &mdash; {{ locations.length }}
          <v-spacer/>
          <location-adding redirect>
            <template #activator="{ on }">
              <v-icon
                :aria-label="$t('locations.actions.add')"
                small
                v-on="on">
                mdi-plus
              </v-icon>
            </template>
          </location-adding>
        </v-row>
      </v-subheader>
      <v-list-item
        v-for="location in locations"
        :key="location.name"
        :to="`/locations/${location.id}`"
        class="primary--text"
        link>
        <v-list-item-avatar v-if="mobile">
          <v-img :src="getLocationThumbnail(location)"/>
        </v-list-item-avatar>
        <v-list-item-icon
          v-else
          class="box-icon gradient--secondary">
          <v-icon>mdi-map-marker-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ location.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list
      :class="{ background: mobile }"
      :dense="!mobile"
      :nav="!mobile"
      subheader>
      <v-subheader class="text-uppercase">
        <v-row class="mx-0">
          {{ $tc('generic.tag', 2) }} &mdash; {{ tags.length }}
          <v-spacer/>
          <v-dialog
            v-model="tagForm"
            max-width="290">
            <template #activator="{ on }">
              <v-icon
                :aria-label="$t('tags.add')"
                small
                v-on="on">
                mdi-plus
              </v-icon>
            </template>
            <tag-form
              add
              @close="tagForm = false"/>
          </v-dialog>
        </v-row>
      </v-subheader>

      <v-divider
        v-if="mobile"
        inset/>
      <template v-for="tag in tags">
        <v-list-item
          :key="tag.id + '-item'"
          :to="`/tags/${tag.id}`"
          link>
          <v-list-item-icon>
            <v-icon :color="tag.color">mdi-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ tagName(tag) }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider
          v-if="mobile"
          :key="tag.id + '-divider'"
          inset/>
      </template>
    </v-list>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import LocationAdding from '@/views/locations/LocationAdding'
import TagForm from '@/views/home/TagForm'
import { getLocationThumbnail } from '@/utils/assets'
import tagName from '@/utils/tags'

export default {
  name: 'RouteCategories',
  props: {
    mobile: Boolean,
  },
  components: { LocationAdding, TagForm },
  data() {
    return {
      tagForm: false
    }
  },
  computed: {
    ...mapState(['assets', 'locations']),
    ...mapState({ tags: store => store.tags.data })
  },
  methods: { getLocationThumbnail, tagName }
}
</script>
