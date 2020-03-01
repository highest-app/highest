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
      target: {
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
      /*
       * Truth table :
       * | description | bottom property || divider |
       * |     0       |       0         ||    1    |
       * |     0       |       1         ||    0    |
       * |     1       |       0         ||    0    |
       * |     1       |       1         ||    0    |
       */
      let divider = this.$slots.description === undefined && !this.bottom
      return createElement(
        'div', [
          createElement(
            'v-list', {
              class: {
                'card': true,
                'card--top': this.top,
                'card--bottom': this.$slots.description === undefined ? this.bottom : true
              }
            },
            [
              createElement(
                'v-list-item', {
                  props: {
                    link: this.clickable,
                    href: this.href,
                    target: this.target,
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
                      this.$slots.action === undefined ? '' :
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
              divider ? createElement('v-divider') : ''
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
