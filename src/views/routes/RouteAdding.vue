<template>
  <responsive-dialog v-model="enabled">
    <template #activator="{ on: dialog }">
      <v-tooltip
        open-delay="500"
        bottom>
        <template #activator="{ on: tooltip }">
          <v-btn
            :aria-label="$t('routes.actions.add')"
            class="gradient--secondary"
            elevation="0"
            fab
            small
            v-on="{ ...dialog, ...tooltip }">
            <v-icon color="white">mdi-sign-direction-plus</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('routes.actions.add') }}</span>
      </v-tooltip>
    </template>
    <template #dialog>
      <div ref="dialog">
        <app-bar
          :title="$t('routes.actions.add')"
          small-only
          fixed>
          <template #bar-left-actions>
            <a @click="resetForm">{{ $t('terms.actions.cancel') }}</a>
          </template>
          <template #bar-right-actions>
            <app-link
              :disable="!valid"
              bold
              @click="add">
              {{ $t('terms.actions.add') }}
            </app-link>
          </template>
        </app-bar>
        <div/>
        <card-group>
          <scanner @scan="scan"/>
        </card-group>
        <route-form
          v-model="form"
          :accept-location="location === null"
          dialog
          @valid="valid = true"
          @unvalid="valid = false"/>
      </div>
    </template>
  </responsive-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import { defaultRouteForm } from '@/utils/forms'
import RouteForm from '@/views/routes/RouteForm'
import Scanner from '@/views/routes/Scanner'

export default {
  name: 'RouteAdding',
  components: { Scanner, RouteForm },
  props: {
    location: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      form: Object.assign({}, defaultRouteForm),

      enabled: false,
      valid: false
    }
  },
  methods: {
    ...mapActions(['addRoute']),
    async add() {
      if (!this.form.enableGoal) this.form.goal = false
      if (this.location !== null) this.form.location = this.location
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
    scan(data) {
      this.form.name = data.name
      this.form.notes = data.notes
      this.form.grade = data.grade
      this.form.length = data.length
      this.form.color = data.color
    },
    resetForm() {
      this.form = Object.assign({}, defaultRouteForm)
      this.enabled = false
    }
  }
}
</script>
