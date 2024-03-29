<template>
  <page-body>
    <v-slide-x-reverse-transition>
      <panel
        v-if="localeSelect"
        :hook="$parent.$parent.$parent.$refs.dialog"
        dialog>
        <select-menu
          v-model="settings.locale"
          :choices="locales.map(locale => locale.locale)"
          :labels="locales"
          :name="$t('settings.display.language.description')"
          auto-back
          mandatory
          @back="localeSelect = false">
          <template #label="{ label }">
            <v-row
              align="center"
              class="mx-1">
              <img
                :src="`/img/locales/${label.locale}.png`"
                :alt="label.name"
                class="pr-2"
                height="19"
                width="auto">
              {{ label.name }}
            </v-row>
          </template>
        </select-menu>
      </panel>
    </v-slide-x-reverse-transition>
    <popup
      v-model="erasePopup"
      right-text="terms.actions.erase"
      critical
      @right-action="eraseData">
      <template #description>{{ $t('settings.data.eraseConfirmation') }}</template>
    </popup>
    <card-group>
      <card-header>{{ $t('settings.display.title') }}</card-header>
      <card
        icon="mdi-translate"
        icon-color="red"
        top
        bottom
        chevron
        @click="localeSelect = true">
        <template #title>{{ $tc('settings.display.language.title', 1) }}</template>
      </card>
    </card-group>

    <card-group>
      <card-header>{{ $t('settings.theme.title')}}</card-header>
      <select-menu
        v-model="settings.theme"
        :labels="themes"
        :choices="themes.map(t => t.value)"
        mandatory
        solo>
        <template #label="{ label }">
          <v-icon left>
            {{ label.icon }}
          </v-icon>
          {{ $t(label.name) }}
        </template>
      </select-menu>
      <span class="card__description">{{ $t('settings.theme.autoDescription') }}</span>
    </card-group>

    <card-group>
      <card-header>{{ $t('settings.data.title') }}</card-header>
      <!-- To enable when data importing will become available
      <card
        top
        @click="exportData">
        <template #title>
          <span class="primary--text">{{ $t('settings.data.export') }}</span>
        </template>
      </card>
      <card disabled>
        <template #title>{{ $t('settings.data.import') }}</template>
      </card> -->
      <card
        top
        bottom
        @click="erasePopup = true">
        <template #title>
          <span class="error--text">{{ $t('settings.data.erase') }}</span>
        </template>
      </card>
    </card-group>

    <card-group>
      <card-header>{{ $t('settings.about.title') }}</card-header>
      <card
        v-if="release === {}"
        top>
        <template #title>
          <span class="font-italic">{{ $t('settings.about.version.retrieving') }}</span>
        </template>
      </card>
      <card
        v-else
        top
        :href="release.url"
        target="_blank">
        <template #title>
          {{ $t('settings.about.version.latest', { number: release.number }) }}<br>
          <span class="primary--text">{{ $t('settings.about.version.goto') }}</span>
        </template>
        <template #action>
          <v-icon color="primary">mdi-open-in-new</v-icon>
        </template>
      </card>
      <card>
        <template #title>
          <v-row
            align="center"
            class="mx-0">
            <v-list-item-avatar
              class="my-0 ml-0"
              tile>
              <v-img src="https://exybore.becauseofprog.fr/img/avatar.png"/>
            </v-list-item-avatar>
            <v-col class="pa-0">
              {{ $t('settings.about.maintainedBy') }}
              <v-row class="mx-0">
                <v-btn
                  href="https://twitter.com/exybore"
                  target="_blank"
                  icon>
                  <v-icon>mdi-twitter</v-icon>
                </v-btn>
                <v-btn
                  href="https://github.com/theovidal"
                  target="_blank"
                  icon>
                  <v-icon>mdi-github</v-icon>
                </v-btn>
                <v-btn
                  href="https://www.youtube.com/channel/UC9Q3XhnYp-bZUgE995Csxww"
                  target="_blank"
                  icon>
                  <v-icon>mdi-youtube</v-icon>
                </v-btn>
                <v-tooltip
                  :value="$vuetify.breakpoint.mdAndDown ? false : undefined"
                  bottom>
                  <template #activator="{ on }">
                    <v-btn
                      href="https://paypal.me/theovidal2103"
                      target="_blank"
                      color="primary"
                      icon
                      v-on="on">
                      <v-icon>mdi-currency-usd</v-icon>
                    </v-btn>
                  </template>
                  <span>{{ $t('settings.about.donate.tip') }}</span>
                </v-tooltip>
              </v-row>
            </v-col>
          </v-row>
        </template>
      </card>
      <card bottom>
        <template #title>
          <span v-html="$t('settings.about.openSource')"/><br>
          <a
            href="https://github.com/highest-app/highest"
            target="_blank">
            {{ $t('settings.about.sourceCode') }}
          </a>
        </template>
      </card>
    </card-group>
  </page-body>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { download } from '@/utils/storage'
import locales from '@/data/locales'

export default {
  name: 'Settings',
  data() {
    return {
      release: {},
      themes: [
        {
          name: 'settings.theme.auto',
          icon: 'mdi-theme-light-dark',
          value: 'auto'
        },
        {
          name: 'settings.theme.light',
          icon: 'mdi-weather-sunny',
          value: 'light'
        },
        {
          name: 'settings.theme.dark',
          icon: 'mdi-weather-night',
          value: 'dark'
        }
      ],

      localeSelect: false,
      erasePopup: false,

      locales
    }
  },
  mounted() {
    this.$http.get('https://api.github.com/repos/highest-app/highest/releases/latest').then(raw => {
      const data = raw.body
      this.release = {
        number: data.tag_name,
        url: data.html_url
      }
    })
  },
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
