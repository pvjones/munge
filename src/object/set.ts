import { toInt } from '../number/toInt'

export const set = <T extends object, K>(
  initial: T,
  path: string | string[],
  value: K
): T => {
  if (!initial) return {} as T
  if (!path) return initial

  let segments: string[] = []
  if (Array.isArray(path)) {
    segments = path
  } else {
    segments = path.split(/[\.\[\]]/g).filter((x) => !!x.trim())
  }

  const _set = (node: any) => {
    if (segments.length > 1) {
      const key = segments.shift() as string
      const nextIsNum = toInt(segments[0], null) === null ? false : true

      node[key] = node[key] === undefined ? (nextIsNum ? [] : {}) : node[key]

      _set(node[key])
    } else {
      node[segments[0]] = value
    }
  }

  const obj = { ...initial }
  _set(obj)

  return obj
}
