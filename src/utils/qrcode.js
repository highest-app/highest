import QRCode from 'qrcode'

const url = 'https://highest.netlify.app/preview/'

const encodings = {
  'route': ({ route, location }) => [route.name, route.notes, route.grade, route.color, route.length, ...encodings['location']({ location })],
  'location': ({ location }) => [location.name, location.address, location.notes]
}

const decodings = {
  'r': data => ({
    type: 'route',
    name: data[0],
    notes: data[1],
    grade: data[2],
    color: data[3],
    length: data[4],
    goal: false,
    tags: [],
    location: decodings['l'](data.slice(5))
  }),
  'l': data => ({
    type: 'location',
    name: data[0],
    address: data[1],
    notes: data[2]
  })
}

function encodeData(type, data) {
  let parts = encodings[type](data)
  return url + `${type[0]};${parts.join(';')}`
}

function decodeData(string) {
  string = string.replace(url, '')
  let raw = string.split(';')
  let type = raw[0]
  let data = raw.slice(1)

  return decodings[type](data)
}

function generateQrCode(data) {
  return QRCode.toDataURL(data, { width: '400', color: { dark: '#2F90F0' } })
}

export default generateQrCode
export { generateQrCode, encodeData, decodeData }
