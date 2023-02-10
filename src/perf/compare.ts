const N = 1000000

let stats = {
  aStart: '',
  aEnd: '',
}

export const compare = (workerA, workerB, options = {}) => {
  const { iterations = N } = options

  const result = { a: 0, b: 0 }

  let n = 0
  let t1
  let t2

  t1 = performance.now()

  while (++n <= iterations) {
    workerA()
  }

  t2 = performance.now()

  result.a = t2 - t1
  n = 0

  t1 = performance.now()

  while (++n <= iterations) {
    workerB()
  }

  t2 = performance.now()

  result.b = t2 - t1

  return result
}
