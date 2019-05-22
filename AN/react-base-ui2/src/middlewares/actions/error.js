import { BASE_REPORT_ERROR_ACTION } from './consts/ActionType';

export function reportError(error) {
  return {
    type: BASE_REPORT_ERROR_ACTION,
    payload: error,
    error: true
  };
}
