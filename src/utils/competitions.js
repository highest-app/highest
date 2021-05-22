import store from '@/store'

function getCompetitionLocation(competitionLocation) {
  let location = {
    type: competitionLocation.type
  }
  if (location.type === 'string') {
    location = {
      type: 'string',
      address: competitionLocation.address
    }
  } else if (location.type === 'location') {
    location = {
      ...location,
      ...store.getters.getLocationById(competitionLocation.locationID)
    }
  } else {
    // TODO : error handling
  }
  return location
}

export { getCompetitionLocation }
