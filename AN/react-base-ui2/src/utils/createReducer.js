import has from 'lodash/has';


const defaultErrorHandler = (state, error) => {
  if (error) {
    console.warn(error.message || 'Error happens');
  }

  return state;
};

const createHandler = (successHandler, errorHandler) => (state, action) => {
  successHandler = successHandler || (s => s);
  errorHandler = errorHandler || defaultErrorHandler;
  return !action.error ? successHandler(state, action) :
    errorHandler(state, action);
};

export default (initialState) => {
  const handlers = {};

  const reducer = (state = initialState, action) => {
    const type = action.type;

    if (!handlers[type]) {
      return state;
    }

    return handlers[type](state, action);
  };

  reducer.on = (actionType, successHandler, errorHandler) => {
    if (has(handlers, actionType)) {
      console.warn(`Action type ${actionType} already in handlers.`);
    }

    handlers[actionType] = createHandler(successHandler, errorHandler);
  };

  return reducer;
};

