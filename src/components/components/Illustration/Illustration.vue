<template>
  <v-row
    style="height: 85vh"
    justify="center"
    align="center">
    <v-col
      cols="12"
      sm="8"
      md="6"
      lg="6"
      xl="4"
      class="text-center">
      <img
        style="width: 100%"
        :src="image"
        :alt="$t(label)">
      <span class="headline">{{ $t(label) }}</span>
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
    }
  }
}
</script>
