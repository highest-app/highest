const grades = [
  '4a', '4b', '4c',
  '5a', '5b', '5c',
  '6a', '6b', '6c',
  '7a', '7b', '7c',
  '8a', '8b', '8c',
  '9a', '9b', '9c'
]

const icons = {
  finished: {
    color: 'primary',
    icon: 'mdi-check-outline'
  },
  goal: {
    color: 'orange',
    icon: 'mdi-clock-outline'
  },
  outdatedGoal: {
    color: 'red darken-4',
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

export { grades, icons, defaultRouteForm, defaultProgressionForm }