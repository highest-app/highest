import Vue from 'vue'

export default Vue.component('card', {
    props: {
      clickable: {
        type: Boolean,
        default: false
      },
      href: {
        type: String,
        default: null
      },
      to: {
        type: String,
        default: null
      },
    },
    render(createElement) {
      return createElement(
        'div', [
          createElement(
            'v-list',
            {
              class: {
                'card': true
              }
            },
            [
              createElement(
                'v-list-item',
                {
                  props: {
                    link: this.clickable,
                    href: this.href,
                    to: this.to
                  }
                },
                [
                  createElement('v-list-content', [
                    createElement('v-list-title', this.$slots.title)
                  ]),
                  createElement('v-spacer'),
                  this.$slots.action
                ]
              ),
              createElement('v-divider')
            ]
          ),
          this.$slots.description !== undefined ? createElement(
            'p',
            {
              class: {
                'card__description': true
              }
            },
            this.$slots.description)
            : ''
        ]
      )
    }
  }
)
