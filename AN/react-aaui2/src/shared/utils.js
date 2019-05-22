export const filterProps = (props = {}, whitelist = [], defaults = {}) =>
  whitelist.reduce((filtered, name) => {
    let propValue

    if (Object.prototype.hasOwnProperty.call(props, name)) {
      propValue = props[name]

      return {
        ...filtered,
        [name]: propValue,
      }
    } else if (Object.prototype.hasOwnProperty.call(defaults, name)) {
      propValue = defaults[name]

      return {
        ...filtered,
        [name]: propValue,
      }
    }

    return {
      ...filtered,
    }
  }, {})

export const noop = () => {}
export const identity = r => r

export const reduceReducers = (...reducers) => (previous, current) =>
  reducers.reduce((p, r) => r(p, current), previous)

// Tag function for class template strings.
export const cls = (template, ...expressions) =>
  template
    .reduce((accumulator, part, i) => accumulator + expressions[i - 1] + part)
    .replace(/\s+/g, ' ')
    .trim()

export function interpolate(...args) {
  const str = args.shift()
  let context = args[0]
  const toString = Object.prototype.toString

  /* eslint-disable no-nested-ternary */
  context =
    args.length === 1
      ? context !== null &&
        /[object Array]|[object Object]/.test(toString.call(context))
        ? context
        : args
      : args

  return str.replace(/{([\s\S]+?)}/g, (match, interpolateStr) => {
    let replacer = interpolateStr
      .split('.')
      .reduce((acc, k) => (acc ? acc[k] : acc), context || {})

    if (toString.call(replacer) === '[object Function]') {
      replacer = replacer(interpolateStr)
    }

    /* eslint-disable no-void */
    return replacer === null || replacer === void 0 ? '' : replacer
  })
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
export function debounce(func, wait, immediate) {
  let timeout
  let context
  let args

  const later = function later() {
    timeout = null
    if (!immediate) func.apply(context, args)
  }

  return (...restArgs) => {
    const callNow = immediate && !timeout

    context = this
    args = restArgs

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)

    if (callNow) func.apply(context, args)
  }
}

// Copy from https://git.io/vMr0D
export function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true
  }

  if (
    typeof objA !== 'object' ||
    objA === null ||
    typeof objB !== 'object' ||
    objB === null
  ) {
    return false
  }

  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)

  if (keysA.length !== keysB.length) {
    return false
  }

  // Test for A's keys different from B.
  const bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB)
  for (let i = 0; i < keysA.length; i += 1) {
    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false
    }
  }

  return true
}

export const omit = (obj, omitKeys = []) => {
  const result = {}
  const keys = Object.keys(obj)

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i]

    // If not found in the `omitKeys`
    if (omitKeys.indexOf(key) === -1) {
      result[key] = obj[key]
    }
  }

  return result
}

export const filterValidProps = (obj, re = /^(aria|data)-.+/) =>
  obj &&
  Object.keys(obj)
    .filter(key => re && re.test(key))
    .reduce(
      (res, key) => ({
        ...res,
        [key]: obj[key],
      }),
      {},
    )
