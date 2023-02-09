import { random } from './random'

/**
 * Draw a random item from a list. Returns null if the list is empty
 */
export const randomDraw = <T>(array: readonly T[]): T | null => {
  const max = array.length
  if (max === 0) {
    return null
  }
  const index = random(0, max - 1)

  return array[index]
}
