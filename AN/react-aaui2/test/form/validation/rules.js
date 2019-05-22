import {
  required,
  email,
  max,
  min,
  numeric,
  url,
  phone,
  regexp,
} from 'form/validation/rules'

it('required', () => {
  expect(required('test')).toBe(true)
  expect(required()).toBe(false)
  expect(required('')).toBe(false)
  expect(required(undefined)).toBe(false)
  expect(required(null)).toBe(false)
})

it('email', () => {
  expect(email('active@active.com')).toBe(true)
  expect(email('AcTive@AcTive.com')).toBe(true)
  expect(email()).toBe(false)
  expect(email('active')).toBe(false)
  expect(email('@active.com')).toBe(false)
  expect(email('active@active')).toBe(false)
  expect(email('')).toBe(false)
  expect(email(undefined)).toBe(false)
  expect(email(null)).toBe(false)
})

it('max', () => {
  expect(max('Hello!', 7)).toBe(true)
  expect(max()).toBe(true)
  expect(max('', 0)).toBe(true)
  expect(max('', 7)).toBe(true)
  expect(max('Hello World!', 7)).toBe(false)
})

it('min', () => {
  expect(min('Hello World!', 7)).toBe(true)
  expect(min()).toBe(true)
  expect(min('', 0)).toBe(true)

  expect(min('Hello!', 7)).toBe(false)
})

it('numeric', () => {
  expect(numeric(7)).toBe(true)
  expect(numeric(-7)).toBe(true)
  expect(numeric(7.7777)).toBe(true)
  expect(numeric('0xFF')).toBe(true)
  expect(numeric('7e7')).toBe(true)
  expect(numeric('07')).toBe(true)
  expect(numeric(Number.MAX_VALUE)).toBe(true)

  expect(numeric()).toBe(false)
  expect(numeric('')).toBe(false)
  expect(numeric('7x')).toBe(false)
  expect(numeric('x7')).toBe(false)
  expect(numeric(null)).toBe(false)
  expect(numeric(undefined)).toBe(false)
  expect(numeric({})).toBe(false)
  expect(numeric(true)).toBe(false)
  expect(numeric(false)).toBe(false)
  expect(numeric([])).toBe(false)
  expect(numeric(Infinity)).toBe(false)
})

it('url', () => {
  expect(url('http://www.active.com/')).toBe(true)
  expect(url('https://www.active.com/')).toBe(true)
  expect(url('ftp://www.active.com/')).toBe(true)
  expect(url('http://active.com/')).toBe(true)
  expect(url('')).toBe(false)
  expect(url('www.active.com/')).toBe(false)
  expect(url('active.com')).toBe(false)
  expect(url('http://active')).toBe(false)
})

it('phone', () => {
  expect(phone('(378) 400-1234')).toBe(true)
  expect(phone('(02) 5551 5678')).toBe(true)
  expect(phone('(02) 55 515 678')).toBe(true)
  expect(phone('1234567890123')).toBe(true)
  expect(phone('')).toBe(false)
  expect(phone()).toBe(false)
  expect(phone(undefined)).toBe(false)
  expect(phone(null)).toBe(false)
})

it('regexp', () => {
  expect(regexp('12345', '(^(\\d{5}|\\d{5}-\\d{4})$)')).toBe(true)
  expect(regexp('', '(^(\\d{5}|\\d{5}-\\d{4})$)')).toBe(true)
  expect(regexp(undefined, '(^(\\d{5}|\\d{5}-\\d{4})$)')).toBe(true)
  expect(regexp('1234', '(^(\\d{5}|\\d{5}-\\d{4})$)')).toBe(false)

  expect(regexp('12345', '')).toBe(true)
  expect(regexp('12345', undefined)).toBe(true)
})
