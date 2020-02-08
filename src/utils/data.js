const grades = [
  '4a', '4b', '4c',
  '5a', '5b', '5c',
  '6a', '6b', '6c',
  '7a', '7b', '7c',
  '8a', '8b', '8c',
  '9a', '9b', '9c'
]

const routeIcons = {
  finished: {
    color: 'primary',
    icon: 'mdi-check-outline'
  },
  goal: {
    color: 'warning',
    icon: 'mdi-clock-outline'
  },
  outdatedGoal: {
    color: 'error',
    icon: 'mdi-clock-outline'
  },
  noGoal: {
    color: '',
    icon: 'mdi-dots-horizontal'
  },

  get (route) {
    if (route.finished) return this.finished
    if (route.goal) {
      if (new Date(route.goal) > new Date(Date.now())) return this.goal
      else return this.outdatedGoal
    }
    return this.noGoal
  }
}

const competitionIcons = {
  notParticipating: {
    color: 'error',
    icon: 'mdi-close-outline'
  },
  thinking: {
    color: 'warning',
    icon: 'mdi-dots-horizontal'
  },
  participating: {
    color: 'primary',
    icon: 'mdi-check-outline'
  },

  get (competition) {
    return this[competition.participation]
  }
}

const tags = [
  { id: 'red', name: 'Rouge', color: 'red' },
  { id: 'orange', name: 'Orange', color: 'orange' },
  { id: 'yellow', name: 'Jaune', color: 'yellow' },
  { id: 'green', name: 'Vert', color: 'green' },
  { id: 'blue', name: 'Bleu', color: 'blue' },
  { id: 'purple', name: 'Violet', color: 'purple' },
  { id: 'gray', name: 'Gris', color: 'gray' },
]

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
  grades, routeIcons, competitionIcons, tags,
  defaultLocationForm, defaultRouteForm, defaultProgressionForm, defaultCompetitionForm
}
