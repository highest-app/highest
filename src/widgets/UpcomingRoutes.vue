<template>
  <widget
    title="widgets.upcomingRoutes.title"
    icon="mdi-routes-clock"
    route="/routes/all">
    <routes-list
      paddingless
      :routes="getUpcomingRoutes"/>
  </widget>
</template>

<script>
import { mapGetters } from 'vuex'
import Widget from './Widget.vue'
import RoutesList from '@/views/routes/RoutesList'

export default {
  name: 'UpcomingRoutes',
  components: { RoutesList, Widget },
  computed: mapGetters(['getUpcomingRoutes'])
}
</script>
