<template>
  <div :class="classes">
    <v-app-bar
      v-if="!smallOnly"
      class="top-bar background"
      elevation="0"
      clipped-left
      prominent>
      <v-col>
        <v-row v-if="$slots['bar-left-actions'] || $slots['bar-right-actions']">
          <div class="top-bar__left-actions">
            <slot name="bar-left-actions"/>
          </div>
          <v-spacer/>
          <div class="top-bar__right-actions">
            <slot name="bar-right-actions"/>
          </div>
        </v-row>
        <v-row :class="`align-${titleAlign} ${!$slots['bar-left-actions'] && !$slots['bar-right-actions'] && 'top-bar__no-actions' }`">
          <slot name="title-prepend"/>
          <slot name="title">
            <h2
              :class="{ 'ml-2': $slots['title-prepend'], 'mr-2': $slots['title-append'] }"
              :style="{ color: titleColor }">{{ title }}</h2>
          </slot>
          <slot name="title-append"/>
          <v-spacer/>
          <div class="top-bar__actions">
            <slot name="top-bar-actions"/>
          </div>
        </v-row>
      </v-col>
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
        <slot name="title">{{ title }}</slot>
        <slot name="title-append"/>
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
    barHideAppend: Boolean,
    smallOnly: Boolean,
    sticky: Boolean,
    title: String,
    titleColor: String,
    titleAlign: {
      type: String,
      default: 'center'
    }
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
