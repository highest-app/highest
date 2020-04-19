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
        <span>{{ $t('routes.add') }}</span>
      </v-tooltip>
    </template>
    <template #dialog>
      <div ref="dialog">
        <app-bar
          :title="$t('routes.add')"
          small-only
          fixed>
          <template #bar-left-actions>
            <a @click="resetForm">{{ $t('terms.cancel') }}</a>
          </template>
          <template #bar-right-actions>
            <a @click="add">{{ $t('terms.add') }}</a>
          </template>
        </app-bar>
        <route-form
          v-model="form"
          dialog
          accept-location/>
      </div>
    </template>
  </responsive-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import { defaultRouteForm } from '@/utils/forms'
import RouteForm from '@/views/routes/RouteForm'

export default {
  name: 'RouteAdding',
  components: { RouteForm },
  data () {
    return {
      form: Object.assign({}, defaultRouteForm),

      enabled: false
    }
  },
  methods: {
    ...mapActions(['addRoute']),
    async add () {
      if (!this.form.enableGoal) this.form.goal = false
      let id = await this.addRoute(this.form)
      this.enabled = false
      await this.$router.push({
        name: 'route',
        params: {
          location: this.form.location,
          route: id
        }
      })
    },
    resetForm () {
      this.form = Object.assign({}, defaultRouteForm)
      this.enabled = false
    }
  }
}
</script>
