<template>
  <div :class="{ 'app-bar--fixed': fixed, 'app-bar__container': true }">
    <v-app-bar
      v-if="!smallOnly"
      class="top-bar background"
      elevation="0"
      clipped-left
      prominent>
      <v-toolbar-title>
        <h2>{{ title }}</h2>
      </v-toolbar-title>
      <v-spacer/>
      <div class="top-bar__actions">
        <slot name="top-bar-actions"/>
      </div>
    </v-app-bar>
    <v-app-bar
      class="app-bar translucent"
      :hide-on-scroll="!smallOnly"
      :inverted-scroll="!smallOnly"
      :scroll-threshold="fixed ? 0 : 128"
      :absolute="fixed"
      :fixed="!fixed"
      :app="!fixed"
      elevation="0">
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
      default: ''
    }
  }
}
</script>
