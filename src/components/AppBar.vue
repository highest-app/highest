<template>
  <div>
    <v-app-bar
      v-if="!onlySmall"
      id="top-app-bar"
      :src="image"
      elevation="0"
      prominent>
      <v-toolbar-title>
        <h2 :class="image.length > 0 ? 'white--text' : ''">{{ title }}</h2>
      </v-toolbar-title>
    </v-app-bar>
    <v-app-bar
      id="app-bar"
      elevation="0"
      app
      :hide-on-scroll="!onlySmall"
      :inverted-scroll="!onlySmall"
      scroll-threshold="128"
      fixed>
      <slot name="left-actions"/>
      <v-spacer/>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer/>
      <slot name="right-actions"/>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'AppBar',
  props: {
    onlySmall: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Climbing'
    },
    image: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>
#app-bar {
  -webkit-backdrop-filter: blur(30px);
  backdrop-filter: blur(30px);
}
#top-app-bar.theme--dark {
  background-color: #303030;
}
#top-app-bar.theme--light {
  background-color: #fafafa;
}
#app-bar.theme--dark {
  background-color: rgba(66, 66, 66, 0.4);
}
#app-bar.theme--light {
  background-color: rgba(255, 255, 255, 0.4);
}
</style>
