import { createStore, applyMiddleware, combineReducers } from 'redux';

import loading from 'shared/reducers/loadingBar';
import error from 'shared/reducers/Error';
import middlewares from 'shared/api/middlewares';
import helpLink from 'shared/reducers/helpLink';
import { applyDevTools } from 'shared/utils/devToolsHelper';
import reducerHandler from 'shared/utils/reducerHandler';

import permitContract from './reducers';

const middleWare = applyDevTools(applyMiddleware(...middlewares));
const appName = '__permit__';
const initData = window[appName].__initialState__;

const store = middleWare(createStore)(combineReducers({
  loading,
  error,
  permitContract,
  helpLink,
  initialData: reducerHandler(initData, {})
}));

export default store;
