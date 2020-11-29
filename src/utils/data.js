const grades = [
  '4A', '4B', '4C',
  '5A', '5B', '5C',
  '6A', '6B', '6C',
  '7A', '7B', '7C',
  '8A', '8B', '8C',
  '9A', '9B', '9C'
]

const gradeElements = {
  numbers: [5, 6, 7, 8, 9],
  letters: ['A', 'B', 'C'],
  modifiers: ['', '+']
}

const routeIcons = {
  finished: {
    color: 'light-green',
    icon: 'mdi-check-outline'
  },
  goal: {
    color: 'amber',
    icon: 'mdi-clock-outline'
  },
  outdatedGoal: {
    color: 'red darken-1',
    icon: 'mdi-clock-outline'
  },
  noGoal: {
    color: 'white',
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
    name: 'notParticipating',
    color: 'red darken-4',
    icon: 'mdi-close-outline'
  },
  thinking: {
    name: 'thinking',
    color: 'amber',
    icon: 'mdi-dots-horizontal'
  },
  participating: {
    name: 'participating',
    color: 'light-green',
    icon: 'mdi-check-outline'
  }
}

const defaultTags = [
  { id: 'red', color: 'red' },
  { id: 'orange', color: 'orange' },
  { id: 'yellow', color: 'yellow' },
  { id: 'green', color: 'green' },
  { id: 'blue', color: 'blue' },
  { id: 'purple', color: 'purple' },
  { id: 'gray', color: 'gray' },
]

export {
  grades,
  gradeElements,
  routeIcons,
  competitionIcons,
  defaultTags
}
