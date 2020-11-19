<template>
  <v-main>
    <app-bar
      :title="tag.default ? $t(`terms.colors.${tag.color}`) : tag.name"
      :small-only="$vuetify.breakpoint.smAndDown">
      <template #title-prepend>
        <v-icon :color="tag.color">mdi-circle</v-icon>
      </template>
      <template #bar-left-actions>
        <a
          class="hidden-md-and-up"
          @click="$router.back()">
          {{ $t('terms.actions.back') }}
        </a>
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
  computed: mapGetters(['getTagById', 'getRoutesByTag'])
}
</script>
