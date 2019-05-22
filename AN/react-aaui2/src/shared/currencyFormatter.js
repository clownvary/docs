import { interpolate } from './utils'

const DEFAULT_FLOAT_LENGTH = 2

/**
 * Example: { number: '123456', separationCount: 3, separator: ',' }
 * 1. Split number string to array. ['1', '2', '3', '4', '5', '6']
 * 2. Reverse the array. ['6', '5', '4', '3', '2', '1']
 * 3. Add separator to item by separationCount. ['6', '5', ',4', '3', '2', '1']
 * 4. Reverse again. ['1', '2', '3', ',4', '5', '6']
 * 5. Join the array to string. '123,456'
 */
const addSeparatorsForIntPart = (number, separationCount, separator) =>
  number
    .split('')
    .reverse()
    .map(
      (n, i) =>
        (i !== number.length - 1 && i % separationCount === separationCount - 1
          ? separator
          : '') + n,
    )
    .reverse()
    .join('')

const addSeparators = (number, separationCount, separator) => {
  const numberStrArr = number.toString().split('.')

  const integerPart = addSeparatorsForIntPart(
    numberStrArr[0].replace(/-/, ''),
    separationCount,
    separator,
  )
  const floatPart = numberStrArr.length > 1 ? `.${numberStrArr[1]}` : ''

  return `${integerPart}${floatPart}`
}

const currencyFormatter = (amount, formatConfig) => {
  const {
    template,
    integerOnly,
    separationCount,
    separator,
    negativeMark,
  } = formatConfig
  const number = integerOnly
    ? parseInt(amount, 10)
    : parseFloat(amount).toFixed(DEFAULT_FLOAT_LENGTH)

  if (isNaN(number)) {
    return ''
  }

  return interpolate(template, {
    amount: addSeparators(number, separationCount, separator),
    negative: amount < 0 ? negativeMark : '',
  })
}

export default currencyFormatter
