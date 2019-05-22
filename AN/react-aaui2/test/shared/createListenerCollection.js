import createListenerCollection from 'shared/createListenerCollection'

let listenerCollection

beforeEach(() => {
  listenerCollection = createListenerCollection()
})

afterEach(() => {
  listenerCollection.clear()
})

it('Subscribe listener', () => {
  const listenerCallback = jest.fn()

  listenerCollection.subscribe(listenerCallback)
  listenerCollection.notify()

  expect(listenerCallback).toBeCalled()
})

it('Unsubscribe listener', () => {
  const listenerCallback = jest.fn()
  const unsubscribe = listenerCollection.subscribe(listenerCallback)

  unsubscribe()
  listenerCollection.notify()

  expect(listenerCallback).not.toBeCalled()
})

it('Unsubscribe listener after calling `clear`', () => {
  const listenerCallback = jest.fn()
  const unsubscribe = listenerCollection.subscribe(listenerCallback)

  listenerCollection.clear()
  unsubscribe()
})

it('Call unsubscribe multiple times', () => {
  const listenerCallback = jest.fn()
  const unsubscribe = listenerCollection.subscribe(listenerCallback)

  unsubscribe()
  unsubscribe()
  unsubscribe()
  unsubscribe()
  unsubscribe()
  listenerCollection.notify()

  expect(listenerCallback).not.toBeCalled()
})

it('Subscribe while the listeners are being invoked: sub1 -> notify -> sub2 -> unsub2', () => {
  const listenerCallback1 = jest.fn()
  const listenerCallback2 = jest.fn()

  listenerCollection.subscribe(listenerCallback1)
  listenerCollection.notify()
  listenerCollection.subscribe(listenerCallback2)()

  expect(listenerCallback1).toBeCalled()
  expect(listenerCallback2).not.toBeCalled()
})

it('Unsubscribe while the listeners are being invoked: sub1 -> notify -> unsub1 -> sub2 -> unsub2', () => {
  const listenerCallback1 = jest.fn()
  const listenerCallback2 = jest.fn()

  const unsubscribe1 = listenerCollection.subscribe(listenerCallback1)
  listenerCollection.notify()
  unsubscribe1()
  listenerCollection.subscribe(listenerCallback2)()

  expect(listenerCallback1).toBeCalled()
  expect(listenerCallback2).not.toBeCalled()
})
