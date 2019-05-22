import createListenerCollection from '../shared/createListenerCollection'
import { FORM_INIT, setInit, setError, setValue } from './module'

const hasOwnProperty = Object.prototype.hasOwnProperty

export default class Store {
  constructor({ asyncReducers = {}, validators = {}, initialState = {} } = {}) {
    this.asyncReducers = asyncReducers
    this.validators = validators
    this.initialState = initialState
    this.currentState = initialState

    this.listeners = createListenerCollection()
    this.childStoreList = []
  }

  tryInjectValidator(key, validator) {
    return this.injectValidator(key, validator)
  }

  injectValidator(key, validator) {
    if (typeof validator !== 'function') {
      throw new Error(
        'Validator should be function when injecting async validator',
      )
    }

    const unregisterValidator = k => {
      delete this.validators[k]
    }

    // Don't inject the same validator
    if (hasOwnProperty.call(this.validators, key)) {
      return unregisterValidator
    }

    this.validators = {
      ...this.validators,
      [key]: validator,
    }

    return unregisterValidator
  }

  tryInvokeValidators() {
    const currentState = this.getState()
    const validators = this.validators
    const validatorKeys = Object.keys(validators)

    // Try to invoke validators from child stores
    this.childStoreList.forEach(childStore => {
      childStore.tryInvokeValidators()
    })

    return validatorKeys.reduce((r, k) => {
      const validator = validators[k]
      const validationResult = validator(currentState[k].value)

      // Dispatch `setError` action if possible
      if (validationResult.errMsg) {
        this.dispatch(
          setError({
            name: validationResult.name,
            value: validationResult.errMsg,
          }),
        )
      }

      return [...r, validationResult]
    }, [])
  }

  injectReducer(key, reducer) {
    if (typeof reducer !== 'function') {
      throw new Error('Reducer should be function when injecting async reducer')
    }

    const unregister = k => {
      delete this.asyncReducers[k]
    }

    // Don't inject the same reducer
    if (hasOwnProperty.call(this.asyncReducers, key)) {
      return unregister
    }

    this.asyncReducers = {
      ...this.asyncReducers,
      [key]: reducer,
    }

    // Initialize form field status and get the default values
    this.dispatch({ type: FORM_INIT }, true)

    // Sync form field initital state if we have set that in the `initialState`
    if (this.initialState[key]) {
      this.dispatch(
        setInit({
          name: key,
          value: this.initialState[key],
        }),
        true,
      )
    }

    return unregister
  }

  dispatch(action, suppressNotify) {
    if (typeof action.type === 'undefined') {
      throw new Error('Action must have a `type` property')
    }

    const state = this.currentState
    const nextState = {}
    const reducerKeys = Object.keys(this.asyncReducers)

    reducerKeys.forEach(k => {
      const reducer = this.asyncReducers[k]
      const previousStateForReducer = state[k]
      const nextStateForReducer = reducer(previousStateForReducer, action, k)

      nextState[k] = nextStateForReducer
    })

    this.currentState = nextState

    !suppressNotify && this.listeners.notify()
  }

  /** If you subscribe or unsubscribe while the listeners are being invoked, this
   *  will not have any effect on the `dispatch()` that is currently in progress.
  */
  subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.')
    }

    return this.listeners.subscribe(listener)
  }

  getState() {
    return this.currentState
  }

  replaceState(state) {
    this.initialState = state
    this.currentState = state
  }

  setError = (name, value) => {
    this.dispatch(
      setError({
        name,
        value,
      }),
    )
  }

  getError = name => {
    const state = this.getState()
    const stateForField = state[name]

    return stateForField && stateForField.errMsg
  }

  setValue = (name, value) => {
    this.dispatch(
      setValue({
        name,
        value,
      }),
    )
  }

  getValue = name => {
    const state = this.getState()
    const stateForField = state[name]

    return stateForField && stateForField.value
  }
}
