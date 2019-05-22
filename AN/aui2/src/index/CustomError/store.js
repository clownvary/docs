import { createStore, applyMiddleware, combineReducers } from 'redux';
import middlewares from 'shared/api/middlewares';
import { applyDevTools } from 'shared/utils/devToolsHelper';
import reducerHandler from 'shared/utils/reducerHandler';

import loading from 'shared/reducers/loadingBar';

const middleWare = applyDevTools(applyMiddleware(...middlewares));
const appName = '__customerror__';
const initData = window[appName].__initialState__;
const store = middleWare(createStore)(combineReducers({
  loading,
  initialData: reducerHandler(initData, {})
}));

export default store;
