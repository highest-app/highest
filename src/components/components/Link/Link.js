import Vue from 'vue'

export default Vue.component('app-link', {
  props: {
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
      if (this.disable) {
        return {
          class: {
            'list-description--text': true
          }
        }
      } else {
        let props = {
          on: {
            click: (event) => this.$emit('click', event)
          }
        }

        if (this.tag === 'a') props.to = this.to
        if (this.tag === 'router-link') {
          props.href = this.href
          props.target = this.target
        }
        return props
      }
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
