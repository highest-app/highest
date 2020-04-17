<template>
  <v-content>
    <select-menu
      v-if="localeSelect"
      v-model="settings.locale"
      :choices="locales.ids"
      :labels="locales.labels"
      :name="$t('settings.localeDescription')"
      auto-back
      @back="localeSelect = false"/>
    <template v-else>
      <app-bar :title="$t('pages.settings')"/>
      <page-body>
        <v-dialog
          v-model="eraseDialog"
          max-width="290"
          persistent>
          <v-card>
            <v-card-title class="headline">{{ $t('terms.actionConfirmation') }}</v-card-title>
            <v-card-text>{{ $t('settings.eraseDataConfirmation') }}</v-card-text>
            <v-card-actions>
              <v-btn
                text
                @click="eraseDialog = false">
                {{ $t('terms.cancel') }}
              </v-btn>
              <v-spacer/>
              <v-btn
                color="error"
                text
                @click="eraseData">
                {{ $t('terms.erase') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <list-group>
          <card-header>{{ $t('settings.display') }}</card-header>
          <card
            top
            @click="localeSelect = true">
            <template #title>{{ $tc('settings.language', 1) }}</template>
            <template #action>
              <v-list-item-icon>
                <v-icon>mdi-chevron-right</v-icon>
              </v-list-item-icon>
            </template>
          </card>
          <card>
            <template #title>{{ $t('settings.darkTheme') }}</template>
            <template #action>
              <v-switch
                v-model="settings.darkTheme"
                :disabled="settings.autoDarkTheme"
                class="pt-0 mt-0"
                color="primary"
                hide-details
                inset/>
            </template>
          </card>
          <card>
            <template #title>{{ $t('settings.autoDarkTheme') }}</template>
            <template #action>
              <v-switch
                v-model="settings.autoDarkTheme"
                class="pt-0 mt-0"
                color="primary"
                hide-details
                inset/>
            </template>
            <template #description>{{ $t('settings.autoDarkThemeDescription') }}</template>
          </card>
        </list-group>

        <list-group>
          <card-header>{{ $t('settings.data') }}</card-header>
          <card
            top
            @click="exportData">
            <template #title>
              <span class="primary--text">{{ $t('settings.exportData') }}</span>
            </template>
          </card>
          <card disabled>
            <template #title>{{ $t('settings.importData') }}</template>
          </card>
          <card
            bottom
            @click="eraseDialog = true">
            <template #title>
              <span class="error--text">{{ $t('settings.eraseData') }}</span>
            </template>
          </card>
        </list-group>

        <list-group>
          <card-header>{{ $t('settings.about') }}</card-header>
          <card top>
            <template #title>
              {{ $t('settings.createdBy') }}
              <a
                href="https://twitter.com/exybore"
                target="_blank">
                Exybore
              </a>
            </template>
          </card>
          <card
            href="https://github.com/highest-app/highest"
            target="_blank"
            bottom>
            <template #title>
              <span class="primary--text">
                {{ $t('settings.sourceCode') }}
              </span>
            </template>
            <template #action>
              <v-icon color="primary">mdi-open-in-new</v-icon>
            </template>
          </card>
        </list-group>
      </page-body>
    </template>
  </v-content>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { download } from '@/utils/storage'

export default {
  name: 'Settings',
  data: () => ({
    locales: {
      ids: ['en', 'fr'],
      labels: ['English (EN-UK)', 'Français (FR)']
    },

    localeSelect: false,
    eraseDialog: false
  }),
  computed: {
    ...mapState(['settings']),
    ...mapGetters(['getRawData'])
  },
  methods: {
    ...mapActions(['updateSettings', 'importData']),
    eraseData () {
      localStorage.removeItem('assets')
      localStorage.removeItem('competitions')
      localStorage.removeItem('feeds')
      localStorage.removeItem('tags')
      localStorage.removeItem('locations')
      localStorage.removeItem('routes')
      localStorage.removeItem('settings')
      window.location.reload()
    },
    exportData () {
      download('highest', 'application/json', this.getRawData)
    }
  },
  watch: {
    settings: {
      handler (value) {
        this.updateSettings(value)
      },
      deep: true
    }
  }
}
</script>
