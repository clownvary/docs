import currencyFormatter from 'shared/currencyFormatter'

const defaultCurrencyFormatConfig = {
  template: 'USD {negative}{amount}',
  integerOnly: false,
  separationCount: 3,
  separator: ',',
  negativeMark: '-',
}

const currencyConfigForInteger = {
  ...defaultCurrencyFormatConfig,
  integerOnly: true,
}

it('currencyFormatter should format currency with right config', () => {
  const res = currencyFormatter('1000', defaultCurrencyFormatConfig)
  expect(res).toBe('USD 1,000.00')
})

it('currencyFormatter should format currency with float number', () => {
  const res = currencyFormatter('-1000.15', defaultCurrencyFormatConfig)
  expect(res).toBe('USD -1,000.15')
})

it('currencyFormatter should format currency with just integer', () => {
  const res = currencyFormatter('-1000.15', currencyConfigForInteger)
  expect(res).toBe('USD -1,000')
})

it('currencyFormatter should format currency with negative', () => {
  const res = currencyFormatter('-1000', defaultCurrencyFormatConfig)
  expect(res).toBe('USD -1,000.00')
})

it('currencyFormatter should handle no amount case', () => {
  const res = currencyFormatter('test', defaultCurrencyFormatConfig)
  expect(res).toBe('')
})
