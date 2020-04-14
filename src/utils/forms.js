import { today } from '@/utils/dates'

const defaultLocationForm = Object.freeze({
  name: '',
  address: '',
  picture: '',
  file: '',
  notes: ''
})

const defaultRouteForm = Object.freeze({
  location: '',
  name: '',
  grade: '',
  notes: '',
  tags: [],
  color: '#00FF00',
  length: 0,
  enableGoal: false,
  goal: today,
})

const defaultProgressionForm = Object.freeze({
  date: today,
  notes: ''
})

const defaultCompetitionForm = Object.freeze({
  name: '',
  location: '',
  description: '',
  participation: 'notParticipating',
  date: today,
})

export {
  defaultLocationForm,
  defaultRouteForm,
  defaultProgressionForm,
  defaultCompetitionForm
}
