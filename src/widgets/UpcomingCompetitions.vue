<template>
  <widget
    title="widgets.upcomingCompetitions.title"
    icon="mdi-medal-outline"
    route="/competitions">
    <competitions-list
      :competitions="getUpcomingCompetitions"
      paddingless
      hide-action/>
  </widget>
</template>

<script>
import { mapGetters } from 'vuex'
import Widget from './Widget.vue'
import CompetitionsList from '@/views/competitions/CompetitionsList'

export default {
  name: 'UpcomingCompetitions',
  components: { CompetitionsList, Widget },
  computed: mapGetters(['getUpcomingCompetitions'])
}
</script>
