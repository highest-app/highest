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
  }
}

export {grades, icons}