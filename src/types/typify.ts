import { ValueOf } from '../models'

interface MaybeElement {
  nodeType?: number
}

type Check = (x: unknown) => boolean
type TFunc = (x: unknown) => ValueOf<typeof TYPES>

interface Typify extends TFunc {
  isArray: Check
  isBoolean: Check
  isDate: Check
  isElement: Check
  isFunction: Check
  isInfinite: Check
  isNaN: Check
  isNull: Check
  isNumber: Check
  isObject: Check
  isRegExp: Check
  isString: Check
  isSymbol: Check
  isUndefined: Check
}

export const TYPES = {
  array: 'array',
  boolean: 'boolean',
  date: 'date',
  element: 'element',
  function: 'function',
  infinite: 'infinite',
  map: 'map',
  nan: 'nan',
  null: 'null',
  number: 'number',
  object: 'object',
  regexp: 'regexp',
  set: 'set',
  string: 'string',
  symbol: 'symbol',
  undefined: 'undefined',
}

const toString = Object.prototype.toString

export const getTag = (value: any) => {
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]'
  }

  return toString.call(value)
}

export const typify = ((x) => {
  if (x === null) return TYPES.null

  if (x && ((x as MaybeElement).nodeType === 1 || (x as MaybeElement).nodeType === 9)) {
    return TYPES.element
  }

  const y = getTag(x)
  const t = y.match(/\[object (.*?)\]/)?.[1]?.toLowerCase()

  if (t === TYPES.number) {
    if (Number.isNaN(x)) return TYPES.nan
    if (!Number.isFinite(x)) return TYPES.infinite
  }

  return t
}) as Typify
