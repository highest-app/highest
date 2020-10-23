import Vue from 'vue'

export default Vue.component('panel', {
  props: {
    dialog: Boolean,
    height: String,
    hook: HTMLElement,
    page: Boolean,
    width: String,
    disableOffset: Boolean
  },
  computed: {
    defaultHeight() {
      return this.hook ? this.hook.offsetHeight : this.height
    },
    defaultWidth() {
      return this.hook ? this.hook.offsetWidth : this.width
    },
    style() {
      let style = 'top:0;'
      if (this.page) {
        style += `height: ${this.defaultHeight}px;`
        if (this.$vuetify.breakpoint.mdAndUp) {
          // Ignoring the drawer on PC
          style += `left: 256px; width: ${this.defaultWidth - 256}px;`
        } else {
          style += `left: 0; width: ${this.defaultWidth}px;`
        }
      } else if (this.dialog) {
        style += `width: ${this.defaultWidth}px; height: ${this.defaultHeight}px;`
        if (!this.disableOffset)
          style += `margin-top: calc((100vh - ${this.defaultHeight}px) / 2);`
      }
      return style
    }
  },
  render(createElement) {
    return createElement(
      'v-theme-provider', {
        props: {
          root: true
        }
      },
      [
        createElement(
          'div', {
            class: {
              panel: true
            },
            style: this.style
          },
          this.$slots.default
        )
      ]
    )
  }
})
