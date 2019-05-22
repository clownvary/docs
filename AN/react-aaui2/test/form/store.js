import Store from 'form/store'
import storeReducer from 'form/module'

const validateActionCreator = () => ({
  type: 'VALIDATION',
})

const notFoundActionCreator = () => ({
  type: 'NOT_FOUND',
})

const invalidActionCreator = () => ({})

const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'VALIDATION':
      return {
        errMsg: '',
        value: 'value',
      }
    default:
      return state
  }
}

it('Store should be initialized successful without passing parameters', () => {
  const store = new Store()

  expect(store).toBeTruthy()
})

it('Store should expose public props', () => {
  const store = new Store()
  const methods = Object.keys(store)

  expect(methods.length === 10).toBe(true)
  expect(methods.includes('asyncReducers')).toBe(true)
  expect(methods.includes('validators')).toBe(true)
  expect(methods.includes('initialState')).toBe(true)
  expect(methods.includes('currentState')).toBe(true)
  expect(methods.includes('listeners')).toBe(true)
  expect(methods.includes('childStoreList')).toBe(true)
  expect(methods.includes('setError')).toBe(true)
  expect(methods.includes('getError')).toBe(true)
  expect(methods.includes('getValue')).toBe(true)
  expect(methods.includes('setValue')).toBe(true)
})

it('Passes the initial state', () => {
  const store = new Store({
    initialState: {
      name: {
        value: 'hello',
      },
    },
  })

  expect(store.getState().name.value === 'hello').toBe(true)
})

it('Applies the reducer to the state', () => {
  const store = new Store()

  store.injectReducer('name', reducer)

  store.dispatch(notFoundActionCreator())
  expect(store.getState().name.errMsg == null).toBe(true)
  expect(store.getState().name.value == null).toBe(true)

  store.dispatch(validateActionCreator())
  expect(store.getState().name.errMsg === '').toBe(true)
  expect(store.getState().name.value === 'value').toBe(true)
})

it('Throws error if action type is undefined', () => {
  expect(() => {
    const store = new Store()

    store.injectReducer('name', reducer)
    store.dispatch(invalidActionCreator())
  }).toThrow()
})

it('Unsubscribe the injected reducer', () => {
  const store = new Store()
  const unsubscriber = store.injectReducer('name', reducer)
  const asyncReducers = store.asyncReducers

  expect(typeof unsubscriber === 'function').toBe(true)
  expect(Object.keys(asyncReducers).length === 1).toBe(true)

  unsubscriber('name')

  expect(Object.keys(asyncReducers).length === 0).toBe(true)
})

it('Throws error when calling injectReducer with invalid reducer', () => {
  expect(() => {
    const store = new Store()
    store.injectReducer('name', 'throws error')
  }).toThrow()
})

it('unsubscribe the injected validator', () => {
  const store = new Store()
  const validatorMock = jest.fn()
  const unsubscriber = store.tryInjectValidator('name', validatorMock)
  const validators = store.validators

  expect(typeof unsubscriber === 'function').toBe(true)
  expect(Object.keys(validators).length === 1).toBe(true)

  unsubscriber('name')

  expect(Object.keys(validators).length === 0).toBe(true)
})

it('throws error when calling tryInjectValidator with invalid validator', () => {
  expect(() => {
    const store = new Store()

    store.tryInjectValidator('name', 'throws error')
  }).toThrow()
})

it('Notify subscribers when state changes', () => {
  const store = new Store()
  const listenerMock = jest.fn()

  store.subscribe(listenerMock)
  store.injectReducer('name', reducer)
  store.dispatch(validateActionCreator())

  expect(listenerMock).toBeCalled()
  expect(listenerMock.mock.calls.length).toBe(1)

  const anotherListenerMock = jest.fn()

  store.subscribe(anotherListenerMock)
  store.dispatch(notFoundActionCreator())

  expect(anotherListenerMock).toBeCalled()
  expect(listenerMock.mock.calls.length).toBe(2)
  expect(anotherListenerMock.mock.calls.length).toBe(1)
})

it('throws error when calling subscribe with invalid listener', () => {
  expect(() => {
    const store = new Store()

    store.subscribe('throws error')
  }).toThrow()
})

it('invoke the validatores of child stores', () => {
  const store = new Store()
  const childStore = new Store()
  const validatorMock = jest.fn(() => ({}))

  childStore.injectReducer('name', reducer)
  childStore.tryInjectValidator('name', validatorMock)
  store.childStoreList.push(childStore)
  store.tryInvokeValidators()

  expect(validatorMock).toBeCalled()
})

it('replaceState', () => {
  const replacedState = { name: { value: 'repalced name' } }
  const store = new Store()

  store.injectReducer('name', storeReducer)
  store.replaceState(replacedState)

  expect(store.getState()).toMatchObject(replacedState)
})

it('getError', () => {
  const name = 'name'
  const value = 'value'
  const errMsg = 'error'
  const store = new Store({
    initialState: {
      [name]: {
        value,
        errMsg,
      },
    },
  })

  expect(store.getError(name)).toBe(errMsg)
})

it('getValue', () => {
  const name = 'name'
  const value = 'value'
  const store = new Store({
    initialState: {
      [name]: {
        value,
      },
    },
  })

  expect(store.getValue(name)).toBe(value)
})

it('setError', () => {
  const name = 'name'
  const value = 'value'
  const errMsg = 'error'
  const store = new Store({
    initialState: {
      [name]: {
        value,
      },
    },
  })

  store.injectReducer(name, storeReducer)
  store.setError(name, errMsg)

  expect(store.getState()[name].errMsg).toBe(errMsg)
})

it('setValue', () => {
  const name = 'name'
  const value = 'value'
  const store = new Store()

  store.injectReducer(name, storeReducer)
  store.setValue(name, value)

  expect(store.getState()[name].value).toBe(value)
})
