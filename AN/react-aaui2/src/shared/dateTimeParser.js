import { reduceReducers } from './utils'

const isValid = (m, min, max) => {
  const number = m && parseInt(m[0], 10)

  return number >= min && number <= max ? number : false
}

/**
  * yyyy - 4 digit year <br>
  * <br>
  * MM - 2 digit month <br>
  * M - 1 or 2 digit month <br>
  * <br>
  * dd - 2 digit day <br>
  * d - 1 or 2 digit day <br>
  * <br>
  * a - am or pm <br>
  * <br>
  * HH - 2 digit hour 0-23 <br>
  * H - 1 or 2 digit hour 0-23 <br>
  * hh - 2 digit hour 1-12 <br>
  * h - 1 or 2 digit hour 1-12 <br>
  * <br>
  * KK - 2 digit hour 0-11 <br>
  * K - 1 or 2 digit hour 0-11 <br>
  * kk - 2 digit hour 1-24 <br>
  * k - 1 or 2 digit hour 1-24 <br>
  * <br>
  * mm - 2 digit minute <br>
  * m - 1 or 2 digit minute <br>
  * <br>
  * ss - 2 digit second <br>
  * s - 1 or 2 digit second <br>
  * <br>
  * SSS - 3 digit milli second <br>
  * S - 1, 2, or 3 digit milli second <br>
  *
*/
export const dateTimeParserConfig = {
  yyyy: [v => v.match(/[1-9][0-9]{3}/), v => v && parseInt(v[0], 10)],
  MM: [v => v.match(/[0-9]{2}/), v => isValid(v, 0, 11)],
  M: [v => v.match(/[0-9]{1,2}/), v => isValid(v, 0, 11)],
  dd: [v => v.match(/[0-9]{2}/), v => isValid(v, 1, 31)],
  d: [v => v.match(/[0-9]{1,2}/), v => isValid(v, 1, 31)],
  HH: [v => v.match(/[0-9]{2}/), v => isValid(v, 0, 23)],
  H: [v => v.match(/[0-9]{1,2}/), v => isValid(v, 0, 23)],
  hh: [v => v.match(/[0-9]{2}/), v => isValid(v, 1, 12)],
  h: [v => v.match(/[0-9]{1,2}/), v => isValid(v, 1, 12)],
  KK: [v => v.match(/[0-9]{2}/), v => isValid(v, 0, 11)],
  K: [v => v.match(/[0-9]{1,2}/), v => isValid(v, 0, 11)],
  kk: [v => v.match(/[0-9]{2}/), v => isValid(v, 1, 24)],
  k: [v => v.match(/[0-9]{1,2}/), v => isValid(v, 1, 24)],
  mm: [v => v.match(/[0-9]{2}/), v => isValid(v, 0, 59)],
  m: [v => v.match(/[0-9]{1,2}/), v => isValid(v, 0, 59)],
  ss: [v => v.match(/[0-9]{2}/), v => isValid(v, 0, 59)],
  s: [v => v.match(/[0-9]{1,2}/), v => isValid(v, 0, 59)],
  SSS: [v => v.match(/[0-9]{3}/), v => isValid(v, 0, 999)],
  S: [v => v.match(/[0-9]{1,3}/), v => isValid(v, 0, 999)],
  a: [
    (v, symbol) => v.match(new RegExp(`(${symbol.AMPMS.join('|')})`)),
    v => v && v[0],
  ],
}

export default function dateTimeParser(symbol) {
  return (value, template = symbol.FORMAT.SHORT_DATETIME) => {
    if (!template || !value) {
      return value
    }

    let nextValue = value
    let index = 0
    const date = []
    // template: yyyy年M月d日ah:mm, value: 2017年5月12日下午12:30 => [2017, 4, 12, 12, 30]
    // template: yyyy-MM-dd, value: 2017-05-12 => [2017, 4, 12]
    const tokens = Object.keys(dateTimeParserConfig)

    // Loop all of the token keys
    for (let i = 0; i < tokens.length; i += 1) {
      const token = tokens[i]

      // Skip current loop if we don't find any token in the template
      if (template.indexOf(token) !== -1) {
        // Run the reducers for the token if found it in the template
        const reducer = reduceReducers(...dateTimeParserConfig[token])
        const tokenValue = reducer(nextValue, symbol)

        // Remove the `tokenValue`
        nextValue = nextValue.replace(tokenValue, '')

        // Store the current `tokenValue` if it's truthy
        if (tokenValue) {
          // Handle `a` token
          if (!Number.isInteger(tokenValue)) {
            if (tokenValue === symbol.AMPMS[1]) {
              if (date[3] !== 12) {
                date[3] += 12
              }
            } else if (date[3] === 12) {
              date[3] = 0
            }
          } else {
            date[index] = tokenValue
            index += 1
          }
        }
      }
    }
    // Substract one from `data[1]` as month is beginning with 0 for January to 11 for December.
    date[1] -= 1

    return new Date(...date)
  }
}
