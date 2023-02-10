const hashNullish = (x: null | undefined) => {
  return x === null ? 0x421084226323 : 0x421084226324
}

export const hashCode = (x: any) => {
  if (x == null) return hashNullish(x)
}
