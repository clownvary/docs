// ------------------------------------
// Constants
// ------------------------------------
export const FORM_INIT = 'FORM_INIT'
export const SET_VALUE = 'SET_VALUE'
export const SET_ERROR = 'SET_ERROR'
export const SET_INIT = 'SET_INIT'

// ------------------------------------
// Actions
// ------------------------------------

export const setValue = ({ name, value }) => ({
  type: SET_VALUE,
  payload: value,
  meta: { name },
})

export const setError = ({ name, value }) => ({
  type: SET_ERROR,
  payload: value,
  meta: { name },
})

export const setInit = ({ name, value }) => ({
  type: SET_INIT,
  payload: value,
  meta: { name },
})

const reducer = (state = { value: undefined }, action, name) => {
  if (action.meta && name !== action.meta.name) {
    return state
  }

  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      }
    case SET_VALUE:
      return {
        ...state,
        value: action.payload,
      }
    case SET_INIT:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

export default reducer
