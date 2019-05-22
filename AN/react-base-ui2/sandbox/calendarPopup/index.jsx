import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { presetRedux } from '../../src/middlewares';
import rootReducer from './reducers';
import App from './app';

const initialState = {};
const middleware = applyMiddleware(...presetRedux);
const store = middleware(createStore)(rootReducer, initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
