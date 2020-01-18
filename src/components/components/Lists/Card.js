import Vue from 'vue'

export default Vue.component('card', {
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
                  on: this.$listeners.click ? {
                    click (event) {
                      this.$emit('click', event)
                    }
                  } : {}
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
