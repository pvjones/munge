// import { imul } from '../number/imul'

const imul = Math.imul
/**
 * Similar in principle to Java's String.hashCode function, but implemented with and
 * optimized for more modern JavaScript. Produces a relatively high-quality 53-bit hash,
 * with significantly lower collision probability compared to Java's 32-bit hash.
 *
 * This is NOT a cryptographic hash function. As a result it should not be used
 * for security-related purposes.
 */
const hash = (x: string, seed: number = 0) => {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed

  for (let i = 0, ch; i < x.length; i++) {
    ch = x.charCodeAt(i)

    h1 = imul(h1 ^ ch, 2654435761)
    h2 = imul(h2 ^ ch, 1597334677)
  }

  h1 = imul(h1 ^ (h1 >>> 16), 2246822507) ^ imul(h2 ^ (h2 >>> 13), 3266489909)
  h2 = imul(h2 ^ (h2 >>> 16), 2246822507) ^ imul(h1 ^ (h1 >>> 13), 3266489909)

  return 4294967296 * (2097151 & h2) + (h1 >>> 0)
}
