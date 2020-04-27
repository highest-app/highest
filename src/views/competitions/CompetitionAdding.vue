<template>
  <responsive-dialog v-model="enabled">
    <template #activator="{ on: dialog }">
      <v-tooltip
        open-delay="500"
        bottom>
        <template #activator="{ on: tooltip }">
          <v-btn
            class="gradient--secondary"
            elevation="0"
            fab
            small
            v-on="{ ...dialog, ...tooltip }">
            <v-icon color="white">mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('competitions.actions.add') }}</span>
      </v-tooltip>
    </template>
    <template #dialog>
      <app-bar
        :title="$t('competitions.actions.add')"
        small-only
        fixed>
        <template #bar-left-actions>
          <a @click="resetForm">{{ $t('terms.actions.cancel') }}</a>
        </template>
        <template #bar-right-actions>
          <a @click="add">{{ $t('terms.actions.add') }}</a>
        </template>
      </app-bar>
      <competition-form
        v-model="form"
        with-location
        dialog/>
    </template>
  </responsive-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import { defaultCompetitionForm } from '@/utils/forms'
import CompetitionForm from '@/views/competitions/CompetitionForm'

export default {
  name: 'CompetitionAdding',
  components: { CompetitionForm },
  data () {
    return {
      form: Object.assign({}, defaultCompetitionForm),
      enabled: false
    }
  },
  methods: {
    ...mapActions(['addCompetition']),
    async add () {
      switch (this.form.participation) {
      case 0:
        this.form.participation = 'notParticipating'
        break
      case 1:
        this.form.participation = 'thinking'
        break
      case 2:
        this.form.participation = 'participating'
        break
      }
      this.form.location = {
        type: 'location',
        locationID: this.form.location
      }
      let id = await this.addCompetition(this.form)
      await this.$router.push({
        name: 'competition',
        params: {
          competition: id
        }
      })
    },
    resetForm () {
      this.form = Object.assign({}, this.defaultCompetitionForm)
      this.enabled = false
    }
  }
}
</script>
