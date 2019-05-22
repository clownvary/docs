import { createStore, applyMiddleware, combineReducers } from 'redux';
import loading from 'shared/reducers/loadingBar';
import error from 'shared/reducers/Error';
import runningCart from 'shared/reducers/runningCart';
import helpLink from 'shared/reducers/helpLink';
import middlewares from 'shared/api/middlewares';
import { applyDevTools } from 'shared/utils/devToolsHelper';
import reducerHandler from 'shared/utils/reducerHandler';
import getBreadCrumbReducerHandler from 'shared/reducers/breadCrumb';
import getPermitFilterReducer from './reducers/permitFilter';
import actions from './reducers/permitAction';
import permits from './reducers/permitGrid';

const middleWare = applyDevTools(applyMiddleware(...middlewares));
const appName = '__reservation__';
const initData = window[appName].__initialState__;

const store = middleWare(createStore)(combineReducers({
  filters: getPermitFilterReducer(initData),
  actions,
  permits,
  loading,
  error,
  runningCart,
  helpLink,
  breadCrumb: getBreadCrumbReducerHandler(initData),
  initialData: reducerHandler(initData, {})
}));

export default store;
