<template>
  <v-main ref="main">
    <v-slide-x-reverse-transition>
      <panel
        v-if="locationSelect"
        :hook="hook"
        page>
        <select-menu
          v-model="location"
          :choices="locations.map(l => l.id)"
          :labels="locations"
          :name="$tc('generic.location', 1)"
          auto-back
          mandatory
          @back="locationSelect = false">
          <template #label="{ label }">
            <v-list-item-avatar class="my-0">
              <v-avatar>
                <v-img :src="getLocationThumbnail(label)"/>
              </v-avatar>
            </v-list-item-avatar>
            {{ label.name }}
          </template>
        </select-menu>
      </panel>
    </v-slide-x-reverse-transition>
    <v-progress-circular
      v-if="data.type === undefined"
      color="primary"
      indeterminate/>
    <template v-else>
      <page-body>
        <v-row class="ma-0">
          <v-col
            cols="12"
            md="6"
            xl="8">
            <template v-if="data.type === 'route'">
              <p class="text-h3">{{ data.name }}</p>
              <v-chip
                :style="`background-color: ${data.color}`"
                tile>
                {{ data.grade }}
              </v-chip>&nbsp;
              <span>{{ data.notes }}</span><br>
              {{ $t('routes.terms.length') }} : {{ data.length }}m
              <location-preview :location="data.location"/>
            </template>
            <location-preview
              v-else-if="data.type === 'location'"
              :location="data"/>
          </v-col>
          <v-col
            cols="12"
            md="6"
            xl="4"
            :class="{ 'mt-15': $vuetify.breakpoint.smAndDown }"
            :style="$vuetify.breakpoint.mdAndUp && 'min-height: 100%'">
            <v-row
              justify="center"
              align="center"
              style="height: 100%"
              class="mx-0">
              <div>
                <img
                  src="/img/logo-large.png"
                  width="80%">
                <p class="text-h5">{{ $t(`qr.preview.add.${data.type}`) }}</p>
                <template v-if="data.type === 'route' && locations.length">
                  <card-group style="width: 100%; margin: 0">
                    <card
                      role="switch"
                      :aria-checked="keepScannedLocation"
                      top
                      @click="keepScannedLocation = !keepScannedLocation">
                      <template #title>{{ $t('qr.preview.keepLocation') }}</template>
                      <template #action>
                        <v-switch
                          v-model="keepScannedLocation"
                          color="primary"
                          hide-details
                          readonly
                          inset/>
                      </template>
                    </card>
                    <card
                      v-if="!keepScannedLocation"
                      :aria-label="$t('terms.aria.selectMenuUnique', { name: $tc('generic.location', 1) })"
                      icon="mdi-map-marker"
                      icon-color="blue"
                      chevron
                      @click="locationSelect = true">
                      <template #title>{{ $tc('generic.location', 1) }}</template>
                      <template
                        v-if="location !== '' && location !== undefined"
                        #action-text>
                        {{ locations.find(l => l.id === location).name }}
                      </template>
                    </card>
                    <card
                      bottom
                      :disabled="!valid"
                      @click="add">
                      <template #title>
                        <app-link :disable="!valid">{{ $t('terms.actions.add') }}</app-link>
                      </template>
                    </card>
                  </card-group>
                </template>
              </div>
            </v-row>
          </v-col>
        </v-row>
      </page-body>
    </template>
  </v-main>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import LocationPreview from '@/views/LocationPreview'

import { getLocationThumbnail } from '@/utils/assets'
import { decodeData } from '@/utils/qrcode'

export default {
  name: 'Preview',
  components: { LocationPreview },
  data() {
    return {
      data: {},

      keepScannedLocation: false,
      locationSelect: false,
      location: '',
    }
  },
  mounted() {
    let raw = decodeURIComponent(this.$route.fullPath.replace('/preview/', ''))
    this.data = decodeData(raw)
    if (!this.locations.length) this.keepScannedLocation = true

    console.log(this.$refs.main.$refs.main)
  },
  computed: {
    ...mapState(['locations']),
    hook() { return this.$refs.main.$refs.main },
    valid() { return this.keepScannedLocation || this.location !== '' }
  },
  methods: {
    ...mapActions(['addRoute', 'addLocation']),
    getLocationThumbnail,
    async add() {
      if (this.data.type === 'location') {
        let id = await this.addLocation(this.data)
        await this.$router.push({
          name: 'location',
          params: { location: id }
        })
      }
      if (this.data.type === 'route') {
        if (this.keepScannedLocation || !this.locations.length) this.data.location = await this.addLocation(this.data.location)
        else this.data.location = this.location
        let id = await this.addRoute(this.data)
        await this.$router.push({
          name: 'route',
          params: {
            location: this.data.location,
            route: id
          }
        })
      }
    }
  }
}
</script>
