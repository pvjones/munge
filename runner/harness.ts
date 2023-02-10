import _ from 'lodash'
import { compare } from '../src/perf/compare'
import { isEmpty } from '../src/types/isEmpty'

export const runHarness = async () => {
  /** START */

  const a = () => {
    return isEmpty(new Set())
  }

  const b = () => {
    return _.isEmpty(new Set())
  }

  const result = compare({ name: 'local', work: a }, { name: 'lodash', work: b })
  console.log('result', result)
}
