<template>
  <div>
    <v-scale-transition>
      <v-overlay
        v-if="active"
        class="zoomable-image"
        z-index="999">
        <v-row
          align="center"
          justify="center"
          class="mx-0"
          @click="active = false">
          <p
            class="list-description--text"
            :style="{ position: 'absolute', top: '15px' }">
            {{ $t('assets.zoom.quit') }}
          </p>
          <img
            :src="src"
            :alt="alt">
        </v-row>
      </v-overlay>
    </v-scale-transition>
    <v-img
      :src="src"
      :alt="alt">
      <v-btn
        class="pa-3"
        icon
        style="position: absolute"
        @click="active = true">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <slot/>
    </v-img>
  </div>
</template>

<script>
export default {
  props: {
    src: String,
    alt: String
  },
  data() {
    return {
      active: false
    }
  },
  computed: {
    classes() {
      return this.active ? ['v-overlay', 'v-overlay--active', 'zoomable--active'] : []
    }
  }
}
</script>

<style lang="stylus">
.zoomable-image .v-overlay__content
  positon: fixed
  width: 100vw
  height: 100vh

  .row
    width: 100% !important
    height: 100% !important

    img
      width: 95%
      height: auto
</style>
