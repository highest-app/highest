import { defaultTags } from '@/utils/data'

const defaults = {
  assets: {},
  competitions: [
    {
      id: 'my-championship',
      name: 'My championship',
      description: 'Organised with some friend 🏆🥂',
      location: {
        type: 'location',
        locationID: 'my-climbing-gym'
      },
      date: '2020-08-14',
      participation: 'participating'
    }
  ],
  feeds: ['https://www.climbing.com/.rss/excerpt/'],
  locations: [
    {
      name: 'My climbing gym',
      address: 'Paris, France',
      id: 'my-climbing-gym',
      notes: 'This is where I practice ! 🧗‍',
      photos: []
    }
  ],
  routes: [
    {
      name: 'The route I love',
      id: 'the-one-i-love',
      location: 'my-climbing-gym',
      grade: '6B',
      length: 21,
      color: '#0665f1',
      notes: "It's my favorite route! Pretty high-level but very fun for sure!",
      photos: [],
      tags: ['red', 'yellow'],
      goal: false,
      finished: true,
      progressions: [
        {
          id: 'pr-1',
          date: '2020-04-01',
          notes: 'First try! Just two more meters...'
        },
        {
          id: 'pr-2',
          date: '2020-04-01',
          notes: "Dave showed me how to deal that strange middle part... I still don't get it 😅"
        },
        {
          id: 'pr-3',
          date: '2020-04-05',
          notes: 'Finished! 💪'
        }
      ]
    },
    {
      name: 'My personal challenge',
      id: 'my-personal-challenge',
      location: 'my-climbing-gym',
      grade: '7A',
      length: 17,
      color: '#7f26fa',
      notes: 'Very hard route 🥵 I will succeed for sure!',
      photos: [],
      tags: ['blue', 'red'],
      goal: '2021-04-01',
      finished: false,
      progressions: []
    }
  ],
  settings: {
    theme: 'auto',
    locale: 'en'
  },
  tags: defaultTags
}

function loadFromStorage(category) {
  let data = localStorage.getItem(category)
  if (data === null) {
    data = JSON.stringify(defaults[category])
    localStorage.setItem(category, data)
  }

  return JSON.parse(data)
}

function saveToStorage(category, data) {
  localStorage.setItem(category, JSON.stringify(data))
}

function download(name, type, data) {
  let blob = new Blob([data], { type });
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveBlob(blob, name)
  }
  else{
    let elem = window.document.createElement('a')
    elem.href = window.URL.createObjectURL(blob)
    elem.download = name
    document.body.appendChild(elem)
    elem.click()
    document.body.removeChild(elem)
  }
}

export { loadFromStorage, saveToStorage, download }
