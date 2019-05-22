import { createStore, applyMiddleware, combineReducers } from 'redux';
import loading from 'shared/reducers/loadingBar';
import error from 'shared/reducers/Error';
import middlewares from 'shared/api/middlewares';
import { applyDevTools } from 'shared/utils/devToolsHelper';
import getBreadCrumbReducerHandler from 'shared/reducers/breadCrumb';
import reducerHandler from 'shared/utils/reducerHandler';
import winResize from './reducers/index';
import permitConfirmation from './reducers/permitConfirmation';

const middleWare = applyDevTools(applyMiddleware(...middlewares));
const appName = '__confirmation__';
const initData = window[appName].__initialState__;

const store = middleWare(createStore)(combineReducers({
  winResize,
  permitConfirmation,
  loading,
  error,
  breadCrumb: getBreadCrumbReducerHandler(initData),
  initialData: reducerHandler(initData, {})
}));

export default store;
