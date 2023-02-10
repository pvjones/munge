import { getTag, TAGS } from './typify'

export const isEmpty = (x: unknown) => {
  if (x == null) return true
  if (typeof x === 'string') return x === ''

  const t = getTag(x)

  switch (t) {
    case TAGS.array:
    case TAGS.object:
      return Object.keys(x).length === 0
    case TAGS.set:
    case TAGS.map:
      return x.size === 0

    default:
      return false
  }
}
