type Job = {
  name?: string
  work: Function
}
type Options = {
  description?: string
  iterations?: number
}
type Result = {
  [key: string]: { duration: string; operations: string }
} & {
  description?: string
}

const N = 1000000
const msPerMin = 60000

const getDuration = (t2: number, t1: number, iterations: number): string =>
  `${(t2 - t1).toFixed(2)} ms / ${iterations.toPrecision(2)} operations`
const getOps = (t2: number, t1: number, iterations: number): string =>
  `${Math.round(1 / ((t2 - t1) / iterations / msPerMin)).toPrecision(4)} operations / min`

export const compare = (jobA: Job, jobB: Job, options: Options = {}) => {
  const { iterations = N, description } = options
  const aName = jobA.name ?? 'a'
  const bName = jobB.name ?? 'b'

  const result: Result = {
    [aName]: { duration: '', operations: '' },
    [bName]: { duration: '', operations: '' },
  }

  if (description) {
    result.description = description
  }

  let n = 0
  let t1
  let t2
  let duration

  t1 = performance.now()

  while (++n <= iterations) {
    jobA.work()
  }

  t2 = performance.now()
  result[aName]['duration'] = getDuration(t2, t1, iterations)
  result[aName]['operations'] = getOps(t2, t1, iterations)

  t1 = performance.now()
  n = 0
  while (++n <= iterations) {
    jobB.work()
  }

  t2 = performance.now()
  duration = t2 - t1
  result[bName]['duration'] = getDuration(t2, t1, iterations)
  result[bName]['operations'] = getOps(t2, t1, iterations)

  return result
}
