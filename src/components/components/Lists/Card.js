import Vue from 'vue'

export default Vue.component('card', {
    props: {
      bottom: Boolean,
      disabled: Boolean,
      extendable: Boolean,
      href: String,
      icon: String,
      iconColor: String,
      target: String,
      to: String,
      top: Boolean
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
      let divider = !this.$slots.description && !this.bottom
      return createElement(
        'div',
        [
          createElement(
          'v-list', {
            class: {
              'card': true,
              'card--top': this.top,
              'card--bottom': this.$slots.description ? true : this.bottom,
              'card--extendable': this.extendable
            }
          },
          [
            createElement(
              'v-list-item', {
                on: this.$listeners.click && {
                  click: (event) => this.$emit('click', event)
                },
                props: {
                  disabled: this.disabled,
                  href: this.href,
                  target: this.target,
                  to: this.to
                }
              },
              [
                this.$slots.avatar && createElement(
                  'v-list-item-avatar',
                  this.$slots.avatar
                ),
                this.icon !== undefined && createElement(
                  'v-list-item-icon', {
                    class: ['box-icon', this.iconColor],
                    style: 'margin-right: 16px'
                  },
                  [
                    createElement(
                      'v-icon',
                      {},
                      this.icon
                    )
                  ]
                ),
                createElement(
                  'v-row', {
                    class: ['mx-0'],
                    props: {
                      align: 'center'
                    }
                  },
                  [
                    this.$slots.title && createElement(
                      'span', {
                        class: { 'subtitle-1': true}
                      },
                      this.$slots.title
                    ),
                    this.$slots.input,
                    this.$slots.action && createElement('v-spacer'),
                    this.$slots['action-text'] && createElement(
                      'span', {
                        class: ['subtitle-1', 'action__text'],
                      }, this.$slots['action-text']
                    ),
                    this.$slots.action
                  ]
                ),
              ]
            ),
            divider && createElement('v-divider')
          ]
        ),
        this.$slots.description && createElement(
          'p', {
            class: ['card__description']
          },
          this.$slots.description)
        ]
      )
    }
  }
)
