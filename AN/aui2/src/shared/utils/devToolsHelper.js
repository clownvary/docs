import { compose } from 'redux';

/* eslint-disable global-require */
const applyDevTools = (middleWare) => {
  if ((__STATIC__ || /* istanbul ignore next */__DEV__) && !__TESTING__) {
    const devTools = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ ?
      /* istanbul ignore next */window.__REDUX_DEVTOOLS_EXTENSION__() :
      require('shared/components/DevTools').instrument();
    return compose(middleWare, devTools);
  }

  return middleWare;
};

export default {
  applyDevTools
};
