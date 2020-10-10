import { createFunctional } from '@/components/utils/helpers'

import './Lists.styl'

import Card from './Card'

let ListGroup = createFunctional('list__group')
let CardGroup = createFunctional('card__group')
let CardHeader = createFunctional('card__header', 'span')

export {
  Card,
  ListGroup, CardGroup, CardHeader
}
