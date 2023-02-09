import { randomFillSync } from 'crypto'
import { LOWERCASE, UPPERCASE, NUMBERS, ALPHANUMERIC } from './alphabets'

let pool: Buffer
let poolOffset: number

const fillPool = (bytes: number): void => {
  if (!pool || pool.length < bytes) {
    pool = Buffer.allocUnsafe(bytes * 128)
    randomFillSync(pool)
    poolOffset = 0
  } else if (poolOffset + bytes > pool.length) {
    randomFillSync(pool)
    poolOffset = 0
  }

  poolOffset += bytes
}

const randomize = (bytes: number) => {
  fillPool((bytes -= 0))
  return pool.subarray(poolOffset - bytes, poolOffset)
}

export const cryptoid = (size = 8, alphabet = ALPHANUMERIC): string => {
  const mask = (2 << (31 - Math.clz32((alphabet.length - 1) | 1))) - 1
  const step = Math.ceil((1.6 * mask * size) / alphabet.length)

  let id = ''

  while (true) {
    const bytes = randomize(step)
    let i = step

    while (i--) {
      id += alphabet[bytes[i] & mask] || ''
      if (id.length === size) return id
    }
  }
}
