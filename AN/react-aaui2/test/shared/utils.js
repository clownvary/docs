import {
  filterProps,
  noop,
  identity,
  reduceReducers,
  cls,
  interpolate,
  debounce,
  shallowEqual,
  omit,
  filterValidProps,
} from 'shared/utils'

beforeAll(() => {
  jest.useFakeTimers()
})

afterAll(() => {
  jest.useRealTimers()
})

it('filterProps func should work right when calling without any arugments', () => {
  expect(filterProps()).toBeTruthy()
})

it('filterProps func should only keep props in the whitelist', () => {
  const props = {
    name: 'name',
    email: 'k@k.com',
    gender: 'male',
  }
  const whitelist = ['name']
  const filteredProps = filterProps(props, whitelist)

  expect(filteredProps).toEqual(
    expect.objectContaining({
      name: 'name',
    }),
  )
})

it('filterProps func should accept defaults value if it does not exist in the props', () => {
  const props = {
    name: 'name',
    email: 'k@k.com',
    gender: 'male',
  }
  const whitelist = ['name', 'age']
  const defaults = {
    age: 1,
  }
  const filteredProps = filterProps(props, whitelist, defaults)

  expect(filteredProps).toEqual(
    expect.objectContaining({
      name: expect.anything(),
      age: expect.anything(),
    }),
  )
})

it("filterProps func should return empty object if can't find props in the whitelist", () => {
  const props = { name: 'name' }
  expect(filterProps(props, ['NOT_FOUND_PROP'])).toMatchObject({})
})

it('noop', () => {
  expect(noop()).toBe(undefined)
})

it('identity', () => {
  expect(identity(1)).toBe(1)
})

it('reduceReducers', () => {
  const add = (a, b) => a + b
  const multi = (a, b) => a * b

  // (1 + 2) * 2
  expect(reduceReducers(add, multi)(1, 2)).toBe(6)
})

it('cls', () => {
  expect(cls(['hello ', ' world ', ''], 1, 2)).toBe('hello 1 world 2')
})

it('interpolate func should support object context', () => {
  const messagesObject = {
    World: 'World',
  }
  const messagesArray = ['World']
  const result = 'Hello World'

  expect(interpolate('Hello {World}', messagesObject)).toBe(result)
  expect(interpolate('Hello {0}', messagesArray)).toBe(result)
})

it('interpolate func should support array context', () => {
  const messagesArray = ['World']
  const result = 'Hello World'

  expect(interpolate('Hello {0}', messagesArray)).toBe(result)
})

it('interpolate func should support literal values', () => {
  const messagesArray = ['World', 'Test', 'Test More']
  const result = 'Hello World, Test, Test More'

  expect(interpolate('Hello {0}, {1}, {2}', ...messagesArray)).toBe(result)
})

it('interpolate func should support replacer func', () => {
  const messagesObject = {
    World: str => str,
  }
  const result = 'Hello World'

  expect(interpolate('Hello {World}', messagesObject)).toBe(result)
})

it('interpolate func should return empty string for not found keys', () => {
  const messagesObject = {
    World: str => str,
  }
  const result = 'Hello World'

  expect(interpolate('Hello {NOT_FOUND}', messagesObject)).not.toBe(result)
})

it('interpolate func should throw error when passing empty string', () => {
  expect(() => {
    interpolate()
  }).toThrow()
})

it("interpolate func should works right when don't specify the context", () => {
  expect(interpolate('NOT_FOUND', null)).toBe('NOT_FOUND')
})

it('interpolate func should works right even the object is complex', () => {
  expect(
    interpolate('{address.line1}, {address.line2}', {
      address: { line1: 'line1', line2: 'line2' },
    }),
  ).toBe('line1, line2')
})

it('debounce func call the callback after 1 second via runTimersToTime', () => {
  const timerCallback = jest.fn()
  const debouncedFun = debounce(timerCallback, 1000)

  debouncedFun()

  expect(timerCallback).not.toBeCalled()

  // Fast-forward until all timers have been executed
  jest.runTimersToTime(1000)

  // Now our callback should have been called!
  expect(timerCallback).toBeCalled()
  expect(timerCallback.mock.calls.length).toBe(1)
})

it('debounce func call the callback right now', () => {
  const timerCallback = jest.fn()
  const debouncedFun = debounce(timerCallback, 1000, true)

  debouncedFun()
  jest.runAllTimers()

  expect(timerCallback).toBeCalled()
})

it('shallowEqual func return true if comparing the same object', () => {
  const objA = { a: 1 }

  expect(shallowEqual(objA, objA)).toBe(true)
})

it('shallowEqual func return true if comparing two object with the same value', () => {
  const objA = { a: 1 }
  const objB = { a: 1 }

  expect(shallowEqual(objA, objB)).toBe(true)
})

it('shallowEqual func return false if comparing two objects with different length', () => {
  const objA = { a: 1 }
  const objB = { a: 1, b: 2 }

  expect(shallowEqual(objA, objB)).toBe(false)
})

it('shallowEqual func return false if comparing different types', () => {
  const objA = { a: 1 }
  const numberB = 1

  expect(shallowEqual(objA, numberB)).toBe(false)
})

it('shallowEqual func return false if comparing two objects with same key but different values', () => {
  const objA = { a: 1 }
  const objB = { a: [] }

  expect(shallowEqual(objA, objB)).toBe(false)
})

it('omit func should works right', () => {
  const objA = { a: 1, b: 2 }
  const objB = omit(objA, ['b'])

  expect(objB).toEqual({ a: 1 })
})

it("omit func should return the original object if don't delete any keys", () => {
  const objA = { a: 1, b: 2 }
  const objB = omit(objA, ['NOT_FOUND'])

  expect(objB).toEqual(objA)
})

it('filterValidProps func should return the valid props which match inputted regular express', () => {
  let customProps = { 'data-qa-id': 1, 'aria-test': 2 }

  expect(customProps).toEqual(filterValidProps(customProps))

  customProps = { wrongProp: 1 }
  expect({}).toEqual(filterValidProps(customProps))

  customProps = null
  expect(filterValidProps(customProps)).toBe(null)
})
