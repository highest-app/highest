<template>
  <responsive-dialog
    v-model="active"
    fullscreen
    persistent>
    <template #activator="{ on }">
      <card
        icon="mdi-qrcode-scan"
        icon-color="secondary"
        top
        bottom
        v-on="on">
        <template #title>Scan QR Code</template>
        <template #action>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </card>
      <!--<v-tooltip
        open-delay="500"
        bottom>
        <template #activator="{ on: tooltip }">
          <v-btn
            :aria-label="$t('profile.title')"
            class="gradient--secondary"
            elevation="0"
            fab
            small
            v-on="{ ...dialog, ...tooltip }">
            <v-icon color="white">mdi-qrcode-scan</v-icon>
          </v-btn>
        </template>
        <span>Scan QR Code</span>
      </v-tooltip>-->
    </template>
    <template #dialog>
      <div ref="scannerDialog">
        <v-slide-x-reverse-transition>
          <panel
            v-if="locationSelect"
            :hook="hook">
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
        <app-bar
          title="Scan QR Code"
          small-only
          fixed>
          <template #bar-left-actions>
            <app-link @click="reset">{{ $t('terms.actions.close') }}</app-link>
          </template>
          <template #bar-right-actions>
            <app-link
              :disable="!valid"
              @click="add">
              {{ $t('terms.actions.add') }}
            </app-link>
          </template>
        </app-bar>
        <page-body>
          <p v-if="error === ''">
            Make sure you give Highest access to your camera, and clearly focus the QR Code.
          </p>
          <p
            v-else
            class="font-weight-bold error--text">
            {{ error }}
          </p>
          <!--<card-group v-if="decoded">
            <card
              top
              :bottom="data.type === 'l'">
              <template
                v-if="data.type === 'r'"
                #title>
                {{ data.name }} &mdash; {{ data.notes }}<br>
                {{ data.grade }}, {{ data.length }}
              </template>
              <template
                v-else-if="data.type === 'l'"
                #title>
                {{ data.name }} ({{ data.address }}) &mdash; {{ data.notes }}
              </template>
            </card>
            <template v-if="data.type === 'r'">
              <card :bottom="keepScannedLocation">
                <template #title>
                  Keep scanned location<br>
                  <span class="list-description--text">{{ data.location.name }} ({{ data.location.address }}) &mdash; {{ data.location.notes }}</span>
                </template>
                <template #action>
                  <v-switch
                    v-model="keepScannedLocation"
                    color="primary"
                    inset/>
                </template>
              </card>
              <card
                v-if="!keepScannedLocation"
                icon="mdi-map-marker"
                icon-color="blue"
                bottom
                @click="locationSelect = true">
                <template #title>{{ $tc('generic.location', 1) }}</template>
                <template
                  v-if="location !== '' && location !== undefined"
                  #action-text>
                  {{ locations.find(l => l.id === location).name }}
                </template>
                <template #action>
                  <v-list-item-icon aria-label="Select">
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-list-item-icon>
                </template>
              </card>
            </template>
          </card-group>-->
          <qrcode-stream
            @decode="onDecode"
            @init="onInit"/>
        </page-body>
      </div>
    </template>
  </responsive-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { QrcodeStream } from 'vue-qrcode-reader'
import { decodeData } from '@/utils/qrcode'
import { getLocationThumbnail } from '@/utils/assets'

export default {
  name: 'Scanner',
  components: { QrcodeStream },
  data() {
    return {
      active: false,
      data: {},
      decoded: false,
      error: '',

      keepScannedLocation: false,
      locationSelect: false,
      location: '',
    }
  },
  computed: {
    ...mapState(['locations']),
    hook() { return this.$el.children[0] },
    valid() { return this.keepScannedLocation || this.location !== '' }
  },
  methods: {
    ...mapActions(['addRoute', 'addLocation']),
    getLocationThumbnail,
    onDecode (result) {
      try {
        let data = decodeData(result)
        this.$emit('scan', data)
        this.reset()
      } catch (e) {
        this.error = e
      }
    },
    async onInit (promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = "ERROR: you need to grant camera access permisson"
        } else if (error.name === 'NotFoundError') {
          this.error = "ERROR: no camera on this device"
        } else if (error.name === 'NotSupportedError') {
          this.error = "ERROR: secure context required (HTTPS, localhost)"
        } else if (error.name === 'NotReadableError') {
          this.error = "ERROR: is the camera already in use?"
        } else if (error.name === 'OverconstrainedError') {
          this.error = "ERROR: installed cameras are not suitable"
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = "ERROR: Stream API is not supported in this browser"
        }
      }
    },
    async add() {
      if (this.data.type === 'l') {
        let id = await this.addLocation(this.data)
        await this.$router.push({
          name: 'location',
          params: { location: id }
        })
      }
      if (this.data.type === 'r') {
        if (this.keepScannedLocation) this.data.location = await this.addLocation(this.data.location)
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
    },
    reset() {
      this.decoded = false
      this.valid = false
      this.data = {}
      this.keepScannedLocation = false
      this.locationSelect = false
      this.location = ''
      this.active = false
    }
  },
}
</script>
