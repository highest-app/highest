import { defaultTags } from '@/utils/data'

function loadFromStorage(category) {
  let defaults = {
    assets: {
      'default': 'https://static.gymlib.com/legacy/img/gyms/cours-decouverte-climb-up-lyon/0b2acc4b-1d80-4288-a3ac-ac34b39df417.jpeg'
    },
    competitions: [],
    feeds: ['https://www.climbing.com/.rss/excerpt/'],
    locations: [
      {
        name: 'My climbing gym',
        address: 'Planet Earth',
        id: 'my-climbing-gym',
        notes: 'This is where I practice !',
        photos: ['default']
      }
    ],
    routes: [
      {
        name: 'The one I love',
        id: 'the-one-i-love',
        location: 'my-climbing-gym',
        grade: '6B',
        length: 21,
        color: '#FF0FF0',
        notes: "It's my favorite route !",
        photos: [],
        tags: ['red', 'yellow'],
        goal: '2020-04-01',
        finished: false,
        progressions: [
          {
            date: '2020-04-01',
            notes: 'First try! Just two more meters...'
          }
        ]
      }
    ],
    settings: {
      darkTheme: false,
      autoDarkTheme: true,
      locale: 'en'
    },
    tags: defaultTags
  }

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
