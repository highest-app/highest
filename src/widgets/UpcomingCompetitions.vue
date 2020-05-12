<template>
  <widget :heading="{ title: 'widgets.upcomingCompetitions', icon: 'mdi-medal-outline' }">
    <competitions-list :competitions="getUpcomingCompetitions"/>
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
