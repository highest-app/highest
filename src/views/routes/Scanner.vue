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
        bottom
        chevron
        v-on="on">
        <template #title>{{ $t('qr.scan.title') }}</template>
      </card>
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
          <p v-if="error === undefined">
            {{ $t('qr.scan.tip') }}
          </p>
          <p
            v-else
            class="font-weight-bold error--text">
            {{ $t(`qr.scan.errors.${error}`) }}
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
      error: undefined,

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
        this.error = error
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

<style lang="stylus">
.qrcode-stream-wrapper
  display: flex !important
  justify-content: center !important

  video
    width: auto !important
</style>
