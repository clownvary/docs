import { isSystemError } from '../api/parseResponse';

export const ADD_ERROR = 'ADD_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';

export function addError({ payload }) {
  const code = payload.code;
  return {
    type: ADD_ERROR,
    payload: {
      ...payload,
      isSystemError: isSystemError(code)
    }
  };
}

export function clearError() {
  return {
    type: CLEAR_ERROR
  };
}
