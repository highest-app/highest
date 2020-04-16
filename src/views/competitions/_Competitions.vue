<template>
  <v-content>
    <app-bar :title="$tc('generic.competition', 2)">
      <template #top-bar-actions>
        <competition-adding/>
      </template>
    </app-bar>
    <page-body>
      <competitions-list :competitions="competitions"/>
    </page-body>
  </v-content>
</template>

<script>
import { mapState } from 'vuex'
import CompetitionAdding from '@/views/competitions/CompetitionAdding'
import CompetitionsList from '@/views/competitions/CompetitionsList'

export default {
  name: 'Competitions',
  components: { CompetitionAdding, CompetitionsList },
  computed: {
    ...mapState(['competitions']),
  }
}
</script>
