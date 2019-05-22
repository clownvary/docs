import { addError } from './Error';

export function raiseUnrecognizedAuthCode(moduleName) {
  return dispatch => dispatch(addError({
    payload: {
      message: `unrecognized authority type for ${moduleName}, please contract administrator.`
    }
  }));
}
