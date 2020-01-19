function loadFromStorage(category) {
  let defaults = {
    settings: '{}',
    routes: '[]',
    locations: '[]',
    competitions: '[]'
  }

  let data = localStorage.getItem(category)
  if (data === null) {
    data = defaults[category]
    localStorage.setItem(category, data)
  }

  return JSON.parse(data)
}

function saveToStorage(category, data) {
  localStorage.setItem(category, JSON.stringify(data))
}

export { loadFromStorage, saveToStorage }
