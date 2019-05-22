import * as DateTimeSymbols from 'form/config/DateTimeSymbols'
import dateTimeFormatter from 'shared/dateTimeFormatter'

const enUSFormatter = dateTimeFormatter(DateTimeSymbols.en_US)
const zhCNFormatter = dateTimeFormatter(DateTimeSymbols.zh_CN)

const date = new Date('2017-05-03 12:30:25')
const tokens = [
  'yyyy',
  'yy',
  'MMMM',
  'MMM',
  'MM',
  'M',
  'EEEE',
  'EEE',
  'dd',
  'd',
  'KK',
  'K',
  'kk',
  'k',
  'HH',
  'H',
  'hh',
  'h',
  'mm',
  'm',
  'ss',
  's',
  'SSS',
  'S',
  'a',
]
const formatedDate = [
  '2017',
  '17',
  'May',
  'May',
  '05',
  '5',
  'Wednesday',
  'Wed',
  '03',
  '3',
  '00',
  '0',
  '13',
  '13',
  '12',
  '12',
  '12',
  '12',
  '30',
  '30',
  '25',
  '25',
  '000',
  '0',
  'p.m.',
]

it('L10nDateTime should display without model', () => {
  const enRes = enUSFormatter(null, date) // Use default en_US template 'MMMM d, yyyy h:mm a'
  expect(enRes).toBe('May 3, 2017 12:30 p.m.')

  const zhRes = zhCNFormatter(null, date) // Use default zh_CN template 'yyyy年M月d日ah:mm'
  expect(zhRes).toBe('2017年5月3日下午12:30')
})

it('L10nDateTime should display with given template', () => {
  const res1 = enUSFormatter('yyyy-MM-dd HH:mm:ss SSS', date)
  expect(res1).toBe('2017-05-03 12:30:25 000')

  const res2 = enUSFormatter(
    'yyyy-MM-dd a hh:mm:ss SSS',
    new Date('2017-05-03 8:10:25'),
  )
  expect(res2).toBe('2017-05-03 a.m. 08:10:25 000')
})

it('L10nDateTime should display all token right ', () => {
  tokens.forEach((token, index) => {
    const res = enUSFormatter(token, date)
    expect(res).toBe(formatedDate[index])
  })
})

it('should work with non-date object', () => {
  expect(enUSFormatter('yyyy-MM-dd HH:mm:ss SSS', '')).toBe('')
})
