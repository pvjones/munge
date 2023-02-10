import _ from 'lodash'
import { compare } from '../src/perf/compare'
import { isEmpty } from '../src/types/isEmpty'

export const runHarness = async () => {
  /** START */

  const jobA = {
    name: 'local',
    work: () => isEmpty([]),
  }
  const jobB = {
    name: 'lodash',
    work: () => _.isEmpty([]),
  }

  const result = compare(jobA, jobB, {
    description: 'Comparison of local vs lodash versions of isEmpty',
  })
  console.log('result', result)
}
