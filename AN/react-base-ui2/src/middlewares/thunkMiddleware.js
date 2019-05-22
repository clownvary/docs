import { pageLoading } from '../services/loading';
import isPromise from '../utils/isPromise';
import { reportError } from './actions/error';
import { ErrorObj } from '../common/error';

function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => (action) => {
    if (typeof action === 'function') {
      const result = action(dispatch, getState, extraArgument);

      if (isPromise(result)) {
        return result.catch((error) => {
          if (!error.processed) {
            /* istanbul ignore if */
            if (pageLoading.isLoading()) {
              pageLoading.hide();
            }
            /* istanbul ignore if */
            if (ErrorObj.isErrorObj(error)) {
              dispatch(reportError(error));
            }
            error.processed = true;
          }
          return Promise.reject(error);
        });
      }

      return result;
    }

    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
