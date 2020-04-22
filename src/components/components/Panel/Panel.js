import Vue from 'vue'

export default Vue.component('panel', {
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: null
    },
    hook: {
      type: HTMLElement,
      default: undefined
    },
    page: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: null
    }
  },
  computed: {
    defaultHeight() {
      return this.hook === undefined ? this.height : this.hook.offsetHeight
    },
    defaultWidth() {
      return this.hook === undefined ? this.width : this.hook.offsetWidth
    },
    style() {
      let style = ''
      if (this.page) {
        style += `top: 0; height: ${this.defaultHeight}px;`
        if (this.$vuetify.breakpoint.mdAndUp) {
          // Ignoring the drawer on PC
          style += `left: 256px; width: ${this.defaultWidth - 256}px;`
        } else {
          style += `left: 0; width: ${this.defaultWidth}px;`
        }
      } else if (this.dialog) {
        style += `width: ${this.defaultWidth}px; height: ${this.defaultHeight}px; margin-top: -75px;`
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
