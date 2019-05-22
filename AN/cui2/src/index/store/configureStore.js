import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { presetRedux } from 'react-base-ui/lib/middlewares';
import { redirectMiddleware, legacyCuiMiddleware } from 'shared/middlewares';
import rootReducer from 'index/reducers';

export default (initialState = {}, history) => {
  const middlewareList = [
    redirectMiddleware, ...presetRedux, legacyCuiMiddleware, routerMiddleware(history)
  ];

  const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

  const middleware = __DEV__ || __STATIC__ ?
   composeEnhancers(applyMiddleware(...middlewareList)) : applyMiddleware(...middlewareList);

  const store = middleware(createStore)(rootReducer, initialState);

  if ((__DEV__ || __STATIC__) && module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers')); // eslint-disable-line global-require
    });
  }

  return store;
};
