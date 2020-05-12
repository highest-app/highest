<template>
  <widget :heading="{ title: 'widgets.upcomingRoutes', icon: 'mdi-routes-clock' }">
    <routes-list :routes="getUpcomingRoutes"/>
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
