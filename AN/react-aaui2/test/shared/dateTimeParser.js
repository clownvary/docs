import * as DateTimeSymbols from 'form/config/DateTimeSymbols'
import dateTimeParser, { dateTimeParserConfig } from 'shared/dateTimeParser'
import { reduceReducers } from 'shared/utils'

const enUSParser = dateTimeParser(DateTimeSymbols.en_US)
const zhCNParser = dateTimeParser(DateTimeSymbols.zh_CN)
const values = [
  '2014',
  '05',
  '5',
  '12',
  '12',
  '12',
  '12',
  '12',
  '12',
  '12',
  '12',
  '12',
  '12',
  '30',
  '30',
  '0',
  '0',
  '000',
  '0',
  'a.m.',
]

it('dateTimeParser without format', () => {
  // M/d/yyyy h:mm a
  expect(enUSParser('5/12/2014 12:30 p.m.')).toEqual(
    new Date(...[2014, 4, 12, 12, 30]),
  )

  expect(enUSParser('5/12/2014 1:30 p.m.')).toEqual(
    new Date(...[2014, 4, 12, 13, 30]),
  )

  expect(enUSParser('5/12/2014 11:30 a.m.')).toEqual(
    new Date(...[2014, 4, 12, 11, 30]),
  )

  expect(enUSParser('5/12/2014 12:30 a.m.')).toEqual(
    new Date(...[2014, 4, 12, 0, 30]),
  )

  // yyyy-M-d h:mm a
  expect(zhCNParser('2014-5-12 12:30 p.m.')).toEqual(
    new Date(...[2014, 4, 12, 12, 30]),
  )
})

it('dateTimeParser with format', () => {
  const enUSParseDate = enUSParser(
    '5/12/2014',
    DateTimeSymbols.en_US.FORMAT.SHORT_DATE,
  )
  expect(enUSParseDate).toEqual(new Date(...[2014, 4, 12]))

  const anotherEnUSParseDate = enUSParser('2014-05-12', 'yyyy-MM-dd')
  expect(anotherEnUSParseDate).toEqual(new Date(...[2014, 4, 12]))

  const zhCNParseDate = zhCNParser(
    '2014-5-12',
    DateTimeSymbols.zh_CN.FORMAT.SHORT_DATE,
  )
  expect(zhCNParseDate).toEqual(new Date(...[2014, 4, 12]))
})

it('dateTimeParserConfig', () => {
  const tokens = Object.keys(dateTimeParserConfig)
  const tokenValues = []
  // Loop all of the token keys
  for (let i = 0; i < tokens.length; i += 1) {
    const token = tokens[i]

    const reducer = reduceReducers(...dateTimeParserConfig[token])
    const tokenValue = reducer(values[i], DateTimeSymbols.en_US)

    tokenValues.push(tokenValue)
  }

  expect(tokenValues).toEqual([
    2014,
    5,
    5,
    12,
    12,
    12,
    12,
    12,
    12,
    false,
    false,
    12,
    12,
    30,
    30,
    null,
    0,
    0,
    0,
    'a.m.',
  ])
})
