import LoadingCounter from 'loading/LoadingCounter'

it('the count is 0 by default', () => {
  const loadingCounter = new LoadingCounter()

  expect(loadingCounter.count === 0).toBe(true)
})

it('add', () => {
  const loadingCounter = new LoadingCounter()

  loadingCounter.add()
  expect(loadingCounter.count === 1).toBe(true)
})

it('dec', () => {
  const loadingCounter = new LoadingCounter()

  loadingCounter.dec()
  expect(loadingCounter.count === -1).toBe(true)
})

it('isEmpty', () => {
  const loadingCounter = new LoadingCounter()

  expect(loadingCounter.isEmpty()).toBe(true)

  loadingCounter.add()
  expect(loadingCounter.isEmpty()).toBe(false)

  loadingCounter.dec()
  expect(loadingCounter.isEmpty()).toBe(true)
})
