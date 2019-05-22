import isPromise from '../utils/isPromise';

export default ({ dispatch }) => next => (action) => {
  // We wish all actions follow the FSA standard.
  // We will add strict FSA checking here in later time.
  if (!action.payload) {
    return next(action);
  }
  const promise = action.payload.promise || action.payload;
  if (!isPromise(promise)) {
    return next(action);
  }

  return promise.then(
    (result) => {
      dispatch({
        ...action,
        payload: result
      });
    }
  ).catch(
    (error) => {
      dispatch({
        ...action,
        payload: error,
        error: true
      });
      return Promise.reject(error);
    });
};
