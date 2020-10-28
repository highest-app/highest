<template>
  <div>
    <v-overlay
      class="zoomable-image"
      z-index="999"
      :value="active">
      <v-row
        align="center"
        justify="center"
        class="mx-0">
        <v-btn
          small
          fab
          fixed
          top
          left
          @click="active = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <img
          :src="src"
          :alt="alt">
      </v-row>
    </v-overlay>
    <v-img
      v-ripple
      :src="src"
      :alt="alt"
      style="cursor: pointer"
      @click="active = true"/>
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
