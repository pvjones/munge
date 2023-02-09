import crypto from 'crypto'

const lowerCase = 'abcdefghijklmnopqrstuvwxyz'
const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const numbers = '1234567890'
const special = '`~!@#$%^&*()-=_+[]{}|;\':",./<>?'
const hex = '123456789ABCDEF'

export const keyGen = (len, options = {}) => {
  const {
    useLowerCase = true,
    useUpperCase = true,
    useNumbers = true,
    useSpecial = false,
    useHex = false,
    library,
  } = options

  let chars = ''
  let key = ''

  if (library) chars = library
  else {
    if (useLowerCase) chars += lowerCase
    if (useUpperCase) chars += upperCase
    if (useNumbers) chars += numbers
    if (useSpecial) chars += special
    if (useHex) chars += hex
    if (library) chars = library
  }

  const buffer = crypto.randomBytes(len)
  const ratio = 256 / Math.min(256, chars.length)

  for (let i = 0; i < len; i++) {
    key += chars[Math.floor(buffer[i] / ratio)]
  }

  return key
}
