<template>
  <v-main>
    <app-bar
      :title="competition.name"
      small-only>
      <template #bar-left-actions>
        <app-link @click="$router.back()">{{ $t('terms.actions.back') }}</app-link>
      </template>
      <template #bar-right-actions>
        <competition-edit
          v-model="editDialog"
          :competition="competition">
          <template #activator="{ on }">
            <app-link v-on="on">{{ $t('terms.actions.edit') }}</app-link>
          </template>
        </competition-edit>
      </template>
    </app-bar>
    <v-container>
      <v-row>
        <v-col
          style="height: 500px"
          order="2"
          order-md="1"
          cols="12"
          md="6">
          <rich-map v-model="location.address"/>
        </v-col>
        <v-col
          order="1"
          order-md="2"
          cols="12"
          md="6">
          <h1>{{ competition.name }}</h1>
          <span class="overline list-description--text">
            <v-icon color="list-description">mdi-map-marker-outline</v-icon>
            <template v-if="location.type === 'location'">{{ location.name }} &mdash;</template>
            {{ location.address }}
          </span>
          <p>{{ competition.description }}</p>
          <span class="primary--text">{{ dateToText(competition.date) }}</span>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapGetters } from 'vuex'
import CompetitionEdit from '@/views/competitions/CompetitionEdit'
import RichMap from '@/views/locations/RichMap'
import { getCompetitionLocation } from '@/utils/competitions'

export default {
  name: 'Competition',
  components: { RichMap, CompetitionEdit },
  data () {
    return {
      editDialog: false
    }
  },
  computed: {
    ...mapGetters(['getCompetitionById', 'getLocationById']),
    competition() {
      return this.getCompetitionById(this.$route.params.competition)
    },
    location() {
      return getCompetitionLocation(this.competition.location)
    }
  }
}
</script>
