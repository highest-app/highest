import Vue from 'vue'

export default Vue.component('card', {
    props: {
      bottom: {
        type: Boolean,
        default: false
      },
      class: {
        type: String,
        default: ''
      },
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
      top: {
        type: Boolean,
        default: false
      }
    },
    render(createElement) {
      return createElement(
        'div', [
          createElement(
            'v-list', {
              class: {
                'card': true,
                'card--top': this.top,
                'card--bottom': this.bottom
              }
            },
            [
              createElement(
                'v-list-item', {
                  props: {
                    link: this.clickable,
                    href: this.href,
                    to: this.to
                  }
                },
                [
                  createElement(
                    'v-row', {
                      class: {
                        'mx-0': true
                      },
                      props: {
                        align: 'center'
                      }
                    },
                    [
                      createElement(
                        'span', {
                          class: { 'subtitle-1': true}
                        },
                        this.$slots.title
                      ),
                      this.$slots.input,
                      createElement('v-spacer'),
                      createElement(
                        'span', {
                          class: {
                            'subtitle-1': true,
                            'action__text': true
                          },
                        }, this.$slots['action-text']
                      ),
                      this.$slots.action
                    ]
                  ),
                ]
              ),
              this.bottom ? '' : createElement('v-divider')
            ]
          ),
          this.$slots.description !== undefined ? createElement(
            'p', {
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
