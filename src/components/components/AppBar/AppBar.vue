<template>
  <div :class="classes">
    <v-app-bar
      v-if="!smallOnly"
      class="top-bar background"
      elevation="0"
      clipped-left
      prominent>
      <v-toolbar-title
        class="row"
        style="margin: inherit">
        <slot name="title-prepend"/>
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
      :scroll-threshold="fix ? 0 : 128"
      :absolute="fix"
      :fixed="!fix"
      :app="!fix"
      elevation="0">
      <div class="app-bar__left-actions">
        <slot name="bar-left-actions"/>
      </div>
      <v-spacer/>
      <v-toolbar-title>
        <slot name="title-prepend"/>
        {{ title }}
      </v-toolbar-title>
      <v-spacer/>
      <div class="app-bar__right-actions">
        <slot name="bar-right-actions"/>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'AppBar',
  props: {
    fixed: Boolean,
    smallOnly: Boolean,
    sticky: Boolean,
    title: String
  },
  computed: {
    fix() {
      return this.fixed || this.sticky
    },
    classes() {
      return {
        'app-bar__container': true,
        'app-bar--fixed': this.fix,
        'app-bar--sticky': this.sticky
      }
    }
  }
}
</script>
