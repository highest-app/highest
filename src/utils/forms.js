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
  goal: new Date().toISOString().substr(0, 10),
})

const defaultProgressionForm = Object.freeze({
  date: new Date().toISOString().substr(0, 10),
  notes: ''
})

const defaultCompetitionForm = Object.freeze({
  name: '',
  location: '',
  description: '',
  participation: 'notParticipating',
  date: new Date().toISOString().substr(0, 10),
})

export {
  defaultLocationForm,
  defaultRouteForm,
  defaultProgressionForm,
  defaultCompetitionForm
}
