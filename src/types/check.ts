export const isPrimitive = (value: any): boolean => {
  return (
    value === undefined ||
    value === null ||
    (typeof value !== 'object' && typeof value !== 'function')
  )
}

export const isArray = (value: any): boolean => {
  return Array.isArray(value)
}

export const isNumber = (value: any): boolean => {
  try {
    return Number(value) === value
  } catch {
    return false
  }
}
