import Vue from 'vue'

export default Vue.component('app-link', {
  props: {
    block: Boolean,
    bold: Boolean,
    critical: Boolean,
    disable: Boolean,
    href: String,
    target: String,
    to: String
  },
  computed: {
    tag() {
      if (this.disable) return 'span'
      else return this.to ? 'router-link' : 'a'
    },
    props() {
      let props = {
        attrs: {
          role: 'button',
          'aria-pressed': false,
          'tabindex': 0
        },
        class: {
          'app-link': true,
          'app-link--block': this.block
        },
        directives: [
          {
            name: 'ripple',
            value: this.block
          }
        ]
      }
      if (this.disable) {
        props.attrs['aria-disabled'] = true
        props.class['list-description--text'] = true
      } else {
        props.attrs['aria-pressed'] = 'false'
        props.on = {
          click: (event) => this.$emit('click', event)
        }
        props.class['error--text'] = this.critical
        props.class['font-weight-bold'] = this.bold

        if (this.tag === 'a') props.to = this.to
        if (this.tag === 'router-link') {
          props.href = this.href
          props.target = this.target
        }
      }
      return props
    }
  },
  render(createElement) {
    return createElement(
      this.tag,
      this.props,
      this.$slots.default
    )
  }
})
