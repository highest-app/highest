import store from '@/store'

function getRouteThumbnail(route) {
  const thumbnail = route.photos[0]
  if (thumbnail === undefined) {
    const location = store.getters.getLocationById(route.location)
    return getLocationThumbnail(location)
  } else
    return store.state.assets[thumbnail]
}

function getLocationThumbnail(location) {
  if (location.photos === undefined) return undefined
  const thumbnail = location.photos[0]
  return thumbnail === undefined ? '/img/defaults/location.jpeg' : store.state.assets[thumbnail]
}

export { getRouteThumbnail, getLocationThumbnail }
