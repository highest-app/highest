<template>
  <v-row
    :style="style"
    justify="center"
    align="center">
    <v-col
      cols="12"
      sm="8"
      md="5"
      lg="4"
      xl="3"
      class="text-center">
      <img
        style="width: 100%"
        :src="image"
        :alt="$t(label)">
      <span class="title">{{ $t(label) }}</span>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Illustration',
  props: {
    image: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    page: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    style() {
      return this.page ? 'height: 85vh' : ''
    }
  }
}
</script>
