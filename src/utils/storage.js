function loadFromStorage(category) {
  let data = localStorage.getItem(category)
  if (data === null || data === '') {
    localStorage.setItem(category, '[]')
    data = '[]'
  }
  return JSON.parse(data)
}

function saveToStorage(category, data) {
  localStorage.setItem(category, JSON.stringify(data))
}

export {loadFromStorage, saveToStorage}
