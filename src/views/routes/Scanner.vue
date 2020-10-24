<template>
  <responsive-dialog
    v-model="active"
    fullscreen
    persistent>
    <template #activator="{ on }">
      <card
        icon="mdi-qrcode-scan"
        icon-color="gradient--secondary"
        top
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
        <app-bar
          title="Scan QR Code"
          small-only
          fixed>
          <template #bar-left-actions>
            <app-link @click="reset">{{ $t('terms.actions.close') }}</app-link>
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
          <qrcode-stream
            @decode="onDecode"
            @init="onInit"/>
        </page-body>
      </div>
    </template>
  </responsive-dialog>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'
import { decodeData } from '@/utils/qrcode'

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
  methods: {
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
    reset() {
      this.decoded = false
      this.data = {}
      this.keepScannedLocation = false
      this.locationSelect = false
      this.location = ''
      this.active = false
    }
  },
}
</script>
