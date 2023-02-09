import { isPrimitive } from '../types/check'

export const shallowClone = <T>(obj: T): T => {
  // Primitive values do not need to be cloned
  if (isPrimitive(obj)) return obj

  // Binding a function to an empty object creates a copy function.
  if (typeof obj === 'function') return obj.bind({})

  // Access the constructor and create a new object; this method can create an array also.
  const newObj = new ((obj as Object).constructor as { new (): T })()

  Object.getOwnPropertyNames(obj).forEach((prop) => {
    ;(newObj as any)[prop] = (obj as any)[prop]
  })

  return newObj
}
