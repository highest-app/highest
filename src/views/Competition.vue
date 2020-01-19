<template>
  <v-content>
    <app-bar
      :title="competition.name"
      small-only>
      <template #bar-left-actions>
        <a @click="$router.back()">Retour</a>
      </template>
      <template #bar-right-actions>
        <a>Modifier</a>
      </template>
    </app-bar>
    <page-body>
      <a
        v-if="location.type === 'external'"
        :href="location.link"
        target="_blank">
        {{ location.name }}
      </a>
      <router-link
        v-if="location.type === 'internal'"
        :to="location.link">
        {{ location.name }}
      </router-link>
    </page-body>
  </v-content>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Competition',
  data () {
    return {
      competition: {},
      location: {}
    }
  },
  mounted () {
    this.competition = this.getCompetitionById(this.$route.params.competition)
    if (this.competition.location.type === 'string') {
      this.location = {
        type: 'external',
        name: this.competition.location.value,
        link: new URL(`https://www.openstreetmap.org/search?query=${this.competition.location.value}`)
      }
    } else if (this.competition.location.type === 'location') {
      const internalLocation = this.getLocationById(this.competition.location.value)
      this.location = {
        type: 'internal',
        name: internalLocation.name,
        link: `/locations/${internalLocation.id}`
      }
    }
  },
  computed: {
    ...mapGetters(['getCompetitionById', 'getLocationById'])
  }
}
</script>
