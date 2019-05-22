import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { createHistory } from 'history';
import { useRouterHistory, createMemoryHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { AppRoot, AppRouter } from 'index/root';
import { configureStore } from 'index/store';
import initializers from './initializers';

import './app.less';

if (__STATIC__) {
  /* eslint-disable */
  require('mockup');
}

const runApp = () => {
  const initialState = window.__reduxInitialState || {};

  if (!__SERVERRENDER__) {
    const history = useRouterHistory(createHistory)();
    const store = configureStore(initialState, history);
    const finalHistory = syncHistoryWithStore(history, store);

    ReactDOM.render(
      <Provider store={store}>
        <AppRoot>
          <AppRouter history={finalHistory} />
        </AppRoot>
      </Provider>, document.getElementById('app-root'));

    initializers.execute(store);
  } else {
    global.serverRender = (path, originalConfig, siteBaseName) => {
      const history = createMemoryHistory();
      const store = configureStore(JSON.parse(originalConfig), history);

      global.__siteBaseName = siteBaseName;
      history.push(path);
      const finalHistory = syncHistoryWithStore(history, store);

      return ReactDOMServer.renderToString(
        <Provider store={store}>
          <AppRoot>
            <AppRouter history={finalHistory} />
          </AppRoot>
        </Provider>);
    };
  }
};

/**
 * Since Safari doesn't yet have the Intl APIs(Chrome fully support, IE11 mostly support) built-in,
 * so need to add the standard Intl polyfill for Safari.
 * Issue link: https://github.com/yahoo/react-intl/issues/100
 * Solution link: http://formatjs.io/guides/runtime-environments/#client
 */
if (!window.Intl) {
  require.ensure([], (require) => {
    require('intl');
    require('intl/locale-data/jsonp/en.js');
    runApp();
  }, 'intl-polyfill');
} else {
  runApp();
}
