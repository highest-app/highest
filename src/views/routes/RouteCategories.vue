<template>
  <div>
    <v-list
      :class="{ background: mobile }"
      dense
      :nav="!mobile"
      subheader>
      <v-subheader class="text-uppercase">{{ $tc('generic.location', 2) }}</v-subheader>
      <location-adding/>
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
      v-if="tags.length"
      :class="{ background: mobile }"
      dense
      :nav="!mobile"
      subheader>
      <v-subheader class="text-uppercase">{{ $tc('generic.tag', 2) }}</v-subheader>

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
          :key="tag.name + '-divider'"
          inset/>
      </template>
    </v-list>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import LocationAdding from '@/views/locations/LocationAdding'
import { getLocationThumbnail } from '@/utils/assets'
import tagName from '@/utils/tags'

export default {
  name: 'RouteCategories',
  components: { LocationAdding },
  props: {
    mobile: Boolean
  },
  computed: {
    ...mapState(['assets', 'locations']),
    ...mapState({ tags: store => store.tags.data })
  },
  methods: { getLocationThumbnail, tagName }
}
</script>
