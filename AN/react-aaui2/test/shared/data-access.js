import {
  count,
  get,
  getIn,
  set,
  del,
  push,
  keys,
} from '../../src/shared/data-access'

it('count should work properly', () => {
  const a = [1, 2, 3]
  expect(count(a)).toBe(3)
})

it('get should work properly', () => {
  const a = {
    a: 1,
  }
  expect(get(a, 'a')).toBe(1)
})

it('getIn should work properly', () => {
  const a = {
    a: {
      b: 1,
    },
  }
  expect(getIn(a, 'a', 'b')).toBe(1)
})

it('set should work properly', () => {
  let a = {
    a: 1,
  }
  a = set(a, 'a', 2)
  expect(get(a, 'a')).toBe(2)

  let b = [1, 2, 3]
  b = set(b, 2, 4)
  expect(get(b, 2)).toBe(4)
})

it('del should work properly', () => {
  let a = [1, 2, 3]

  a = del(a, 1)
  expect(a[1]).toBe(3)
})

it('push should work properly', () => {
  let a = [1, 2, 3]

  a = push(a, 4)
  expect(a[3]).toBe(4)
})

it('keys should work properly', () => {
  const a = {
    a: 1,
  }
  const keyes = keys(a)
  expect(keyes[0]).toBe('a')
})
