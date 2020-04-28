<template>
  <div class="snackbar">
    <responsive-dialog v-model="details">
      <template #dialog>
        <app-bar
          :title="$t('terms.error.details')"
          small-only
          sticky>
          <template #bar-left-actions>
            <a @click="details = false">{{ $t('terms.actions.close') }}</a>
          </template>
        </app-bar>
        <page-body>
          <card top>
            <template #title>{{ snackbar.details }}</template>
          </card>
          <card
            bottom
            href="https://github.com/highest-app/highest/issues/new?assignees=&labels=&template=bug_report.md&title="
            target="_blank">
            <template #title>
              <span class="primary--text">
                {{ $t('terms.error.report') }}
              </span>
            </template>
          </card>
        </page-body>
      </template>
    </responsive-dialog>
    <v-snackbar
      v-model="snackbar.show"
      :timeout="4000"
      :right="$vuetify.breakpoint.mdAndUp"
      top>
      <v-row no-gutters>
        <v-row
          class="ma-3"
          style="flex-wrap: nowrap">
          <span>{{ snackbar.message }}</span>
          <v-spacer/>
          <v-btn
            v-if="snackbar.error"
            color="primary"
            text
            @click="details = true">
            {{ $t('terms.actions.details') }}
          </v-btn>
        </v-row>
        <v-progress-linear
          v-model="bar"
          color="primary"/>
      </v-row>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Snackbar',
  data() {
    return {
      bar: 0,
      details: false
    }
  },
  computed: mapState(['snackbar']),
  watch: {
    'snackbar.show' () {
      let time = 0
      let intervalID = window.setInterval(() => {
        if (time < 80) {
          time++
          this.bar = (time / 70) * 100
          console.log("time is", time)
          console.log('bar is ', this.bar)
        } else {
          this.bar = 0
          window.clearInterval(intervalID)
        }
      }, 50)
    }
  }
}
</script>

<style lang="stylus">
.v-snack__wrapper
  color: var(--v-paragraph-base) !important
  background-color: var(--v-sheets-base) !important
  border-radius: 0

  .v-snack__content
    padding: 0
</style>
