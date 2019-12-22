<template>
  <div>
    <v-app-bar
      v-if="!smallOnly"
      id="top-app-bar"
      :src="image"
      elevation="0"
      prominent>
      <v-toolbar-title>
        <h2 :class="image.length > 0 ? 'white--text' : ''">{{ title }}</h2>
      </v-toolbar-title>
      <v-spacer/>
      <div id="top-bar-actions">
        <slot name="top-bar-actions"/>
      </div>
    </v-app-bar>
    <v-app-bar
      id="app-bar"
      :hide-on-scroll="!smallOnly"
      :inverted-scroll="!smallOnly"
      :scroll-threshold="fixed ? 0 : 128"
      elevation="0"
      :fixed="!fixed"
      :app="!fixed">
      <slot name="bar-left-actions"/>
      <v-spacer/>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer/>
      <slot name="bar-right-actions"/>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'AppBar',
  props: {
    smallOnly: {
      type: Boolean,
      default: false
    },
    fixed: {
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
#top-app-bar.theme--dark {
  background-color: #303030;
}
#top-app-bar.theme--light {
  background-color: #fafafa;
}
#top-app-bar #top-bar-actions {
  align-self: flex-end;
  padding-bottom: 6px;
}

#app-bar {
  -webkit-backdrop-filter: blur(30px);
  backdrop-filter: blur(30px);
}
#app-bar .v-toolbar__title {
  font-size: 16px;
  font-weight: 500;
  max-width: 50%;
}
@supports(padding-left: max(0px)) {
  #top-app-bar .v-toolbar__content {
    padding-left: max(16px, env(safe-area-inset-left));
  }
}
#app-bar.theme--dark {
  background-color: rgba(66, 66, 66, 0.4);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
#app-bar.theme--light {
  background-color: rgba(255, 255, 255, 0.4);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}
</style>
