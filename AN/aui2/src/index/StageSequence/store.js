import { createStore, applyMiddleware, combineReducers } from 'redux';

import loading from 'shared/reducers/loadingBar';
import error from 'shared/reducers/Error';
import middlewares from 'shared/api/middlewares';
import getBreadCrumbReducerHandler from 'shared/reducers/breadCrumb';
import { applyDevTools } from 'shared/utils/devToolsHelper';
import reducerHandler from 'shared/utils/reducerHandler';
import stageSequence from './reducers';

const middleWare = applyDevTools(applyMiddleware(...middlewares));
const appName = '__stageSequence__';
const initData = window[appName].__initialState__;

const store = middleWare(createStore)(combineReducers({
  loading,
  error,
  stageSequence,
  breadCrumb: getBreadCrumbReducerHandler(initData),
  initialData: reducerHandler(initData, {})
}));

export default store;
