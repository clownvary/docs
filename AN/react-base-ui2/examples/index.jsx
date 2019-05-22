import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { hookLocaleData } from 'src/services/i18n';
import { presetRedux } from 'src/middlewares';
import rootReducer from './reducers';
import App from './App';
import Gallery from './Gallery';

import './index.less';

const initialState = {};
const middleware = applyMiddleware(...presetRedux);
const store = middleware(createStore)(rootReducer, initialState);
window.demo_store = store;

const runApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <HashRouter>
        <App gallery={Gallery} />
      </HashRouter>
    </Provider>,
    document.getElementById('app'));
};


/**
 * Since Safari doesn't yet have the Intl APIs(Chrome fully support, IE11 mostly support) built-in,
 * so need to add the standard Intl polyfill for Safari.
 * Issue link: https://github.com/yahoo/react-intl/issues/100
 * Solution link: http://formatjs.io/guides/runtime-environments/#client
 */

require.ensure([
  'intl',
  'intl/locale-data/jsonp/en.js',
  'intl/locale-data/jsonp/fr.js',
  'intl/locale-data/jsonp/zh.js'
], (require) => {
  if (!global.Intl) {
    require('intl');
  }

  hookLocaleData();
  require('intl/locale-data/jsonp/en.js');
  require('intl/locale-data/jsonp/fr.js');
  require('intl/locale-data/jsonp/zh.js');
  runApp();
});
