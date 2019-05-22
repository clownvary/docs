import { interpolate } from './utils'

const cutDigit = size => number => {
  const length = number.toString().length

  return length < size
    ? '000000'.substr(0, size - length) + number
    : number % 10 ** size // eslint-disable-line no-mixed-operators
}

const dateTimeConfig = {
  yyyy: [d => d.getFullYear()],
  yy: [d => d.getFullYear(), cutDigit(2)],
  MMMM: [d => d.getMonth(), (i, symbol) => symbol.MONTHS[i]],
  MMM: [d => d.getMonth(), (i, symbol) => symbol.SHORTMONTHS[i]],
  MM: [d => d.getMonth() + 1, cutDigit(2)],
  M: [d => d.getMonth() + 1],
  EEEE: [d => d.getDay(), (i, symbol) => symbol.WEEKDAYS[i]],
  EEE: [d => d.getDay(), (i, symbol) => symbol.SHORTWEEKDAYS[i]],
  dd: [d => d.getDate(), cutDigit(2)],
  d: [d => d.getDate()],
  KK: [d => d.getHours() % 12, cutDigit(2)],
  K: [d => d.getHours() % 12],
  kk: [d => d.getHours() + 1, cutDigit(2)],
  k: [d => d.getHours() + 1],
  HH: [d => d.getHours(), cutDigit(2)],
  H: [d => d.getHours()],
  hh: [d => d.getHours() % 12 || 12, cutDigit(2)],
  h: [d => d.getHours() % 12 || 12],
  mm: [d => d.getMinutes(), cutDigit(2)],
  m: [d => d.getMinutes()],
  ss: [d => d.getSeconds(), cutDigit(2)],
  s: [d => d.getSeconds()],
  SSS: [d => d.getMilliseconds(), cutDigit(3)],
  S: [d => d.getMilliseconds()],
  a: [
    d => (d.getHours() < 12 || d.getHours() === 24 ? 0 : 1),
    (i, symbol) => symbol.AMPMS[i],
  ],
}

const ruleRunner = symbol => (dateTime, token) => {
  const fns = dateTimeConfig[token]
  return fns.reduce((acc, fn) => fn(acc, symbol), dateTime)
}

const keyRegs = Object.keys(dateTimeConfig).reduce(
  (acc, key) => ({ ...acc, [key]: new RegExp(key, 'g') }),
  {},
)

export default function dateTimeFormatter(symbol) {
  const runRule = ruleRunner(symbol)
  return (template, date = new Date()) => {
    if (!date || typeof date !== 'object') {
      return date
    }

    /**
     * The template will be replaced by placeholder based on the tokens (like 'yyyy' or 'dd').
     * params will be filled with the formated data (like '2017' or '31').
     *
     * Example: template is 'MM/d/yyyy hh:mm yyyy', date is '2017/12/01 11:30 a.m.'
     *          newTemp will be '{1}/{2}/{0} {3}:{4} {0}'
     *          params will be ['2017', '12', '1', '11', '30']
     */
    const params = []
    const newTemp = Object.keys(dateTimeConfig).reduce((acc, key) => {
      if (acc.indexOf(key) > -1) {
        params.push(runRule(date, key))
        return acc.replace(keyRegs[key], `{${params.length - 1}}`)
      }
      return acc
    }, template || symbol.FORMAT.LONG_DATETIME)
    return interpolate(newTemp, params)
  }
}
