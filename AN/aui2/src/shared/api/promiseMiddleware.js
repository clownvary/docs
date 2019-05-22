import { addError } from '../actions/Error';
import { RequestError } from './API';
import { isSystemError } from './parseResponse';
import { showLoadingbar, hideLoadingbar } from '../actions/loadingBar';
import requestCounter from './stateManager';

export default function promiseMiddleware(API) {
  return ({ dispatch, getState }) => next => (action) => {
    const { promise, types, ...rest } = action;
    if (!promise) {
      return next(action);
    }

    let ignoreBusinessErrors = false;
    let ignoreLoadingbar = false;
    let ignoreSystemErrors = false;

    if (action.meta) {
      ignoreBusinessErrors = !!action.meta.ignoreBusinessErrors;
      ignoreLoadingbar = !!action.meta.ignoreLoadingbar;
      ignoreSystemErrors = !!action.meta.ignoreSystemErrors;
    }

    const [REQUEST, SUCCESS, FAILURE] = types;
    next({ ...rest, type: REQUEST });

    if (!ignoreLoadingbar) {
      // If this is the first living ajax call, we show the loading bar
      if (requestCounter.isEmptyLivingRequest()) {
        dispatch(showLoadingbar());
      }
      // track every living ajax call.
      requestCounter.livingRequestCountUp();
    }

    const actionPromise = promise(API, dispatch, getState);
    actionPromise
      .then(({ payload }) => next({ ...rest, payload, type: SUCCESS }))
      .catch((error) => {
        if (error instanceof RequestError) {
          if (ignoreBusinessErrors) {
            /* istanbul ignore else */
            if (isSystemError(error.payload.headers.response_code) && !ignoreSystemErrors) {
              next(addError({
                payload: {
                  code: error.payload.headers.response_code,
                  message: error.payload.headers.response_message
                }
              }));
            }
          } else {
            next(addError({
              payload: {
                code: error.payload.headers.response_code,
                message: error.payload.headers.response_message
              }
            }));
          }
        } else {
          next(addError({ payload: { message: error.message } }));
        }

        next({ ...rest, error, type: FAILURE });
        /**
         * Todo:
         * should Promise.reject(err) when has js or API error
         * but we have use false in before, so can't change it for now,
         * because the scope is too big.
         */
        return error;
      })
      .then(() => {
        if (!ignoreLoadingbar) {
          // make sure the count down the livingRequest in another event loop
          // to handle we chain the ajax call.
          setTimeout(() => {
            // release the death ajax call.
            requestCounter.livingRequestCountDown();

            // if all the ajax call is death, we release the loading bar
            if (requestCounter.isEmptyLivingRequest()) {
              dispatch(hideLoadingbar());
            }
          }, 0);
        }
      });

    return actionPromise;
  };
}
