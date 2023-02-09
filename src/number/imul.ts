const toUint32 = (x: number): number => {
  return Number(x) >>> 0
}

const legacyImplementation = (x: number, y: number) => {
  // taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul
  const a = toUint32(x)
  const b = toUint32(y)

  const ah = (a >>> 16) & 0xffff
  const al = a & 0xffff

  const bh = (b >>> 16) & 0xffff
  const bl = b & 0xffff

  /*
   * the shift by 0 fixes the sign on the high part
   * the final |0 converts the unsigned value into a signed value
   */
  return (al * bl + (((ah * bl + al * bh) << 16) >>> 0)) | 0
}

export const imul =
  typeof Math.imul === 'function' && Math.imul(0xffffffff, 2) === -2
    ? Math.imul
    : legacyImplementation
