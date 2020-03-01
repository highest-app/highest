import { today } from './parsing'

const defaultLocationForm = Object.freeze({
  name: '',
  picture: '',
  notes: ''
})

const defaultRouteForm = Object.freeze({
  location: '',
  name: '',
  grade: '',
  notes: '',
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
