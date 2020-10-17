import QRCode from 'qrcode'

const encodings = {
  'route': ({ route, location }) => [route.name, route.notes, route.grade, route.length, ...encodings['location']({ location })],
  'location': ({ location }) => [location.name, location.address, location.notes]
}

function encodeData(type, data) {
  let parts = encodings[type](data)
  return `${type[0]};${parts.join(';')}`
}

function generateQrCode(data) {
  return QRCode.toDataURL(data, { width: '400', color: { dark: '#2F90F0' } })
}

export default generateQrCode
export { generateQrCode, encodeData }
