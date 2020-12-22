<template>
  <v-main>
    <app-bar
      :title="tagName(tag)"
      :small-only="$vuetify.breakpoint.smAndDown">
      <template #title-prepend>
        <v-icon :color="tag.color">mdi-circle</v-icon>
      </template>
      <template #bar-left-actions>
        <app-link
          class="hidden-md-and-up"
          @click="$router.back()">
          {{ $t('terms.actions.back') }}
        </app-link>
      </template>
    </app-bar>
    <page-body>
      <list-group>
        <routes-list
          :routes="routes"
          show-location
          background/>
      </list-group>
    </page-body>
  </v-main>
</template>

<script>
import { mapGetters } from 'vuex'
import RoutesList from '@/views/routes/RoutesList'
import tagName from '@/utils/tags'

export default {
  name: 'Tag',
  components: { RoutesList },
  data() {
    return {
      tag: [],
      routes: []
    }
  },
  mounted() {
    let id = this.$route.params.tag
    this.tag = this.getTagById(id)
    if (this.tag === undefined) this.$router.push('/routes')
    this.routes = this.getRoutesByTag(id)
  },
  computed: mapGetters(['getTagById', 'getRoutesByTag']),
  methods: { tagName }
}
</script>
