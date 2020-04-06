<template>
  <div>
    <v-list
      :class="{ background: mobile }"
      dense
      :nav="!mobile"
      subheader>
      <v-subheader>{{ $tc('generic.location', 2).toUpperCase() }}</v-subheader>
      <location-adding/>
      <v-list-item
        v-for="location in locations"
        :key="location.name"
        :to="`/locations/${location.id}`"
        class="primary--text"
        link>
        <v-list-item-avatar v-if="mobile">
          <v-img :src="location.photos[0]"/>
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
      dense
      :nav="!mobile"
      subheader>
      <v-subheader>{{ $tc('generic.tag', 2).toUpperCase() }}</v-subheader>

      <v-divider
        v-if="mobile"
        inset/>
      <template v-for="tag in tags">
        <v-list-item
          :key="tag.name + '-item'"
          :to="`/tags/${tag.id}`"
          link>
          <v-list-item-icon>
            <v-icon :color="tag.color">mdi-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ tag.default ? $t(`terms.${tag.color}`) : tag.name }}</v-list-item-title>
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
import { mapGetters } from 'vuex'
import LocationAdding from '@/views/parts/LocationAdding'

export default {
  name: 'RouteCategories',
  components: { LocationAdding },
  props: {
    mobile: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      locations: [],
      tags: []
    }
  },
  mounted () {
    this.tags = this.getTags
    this.locations = this.getLocations
  },
  computed: {
    ...mapGetters(['getTags', 'getLocations'])
  }
}
</script>
