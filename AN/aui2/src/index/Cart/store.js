import { createStore, applyMiddleware, combineReducers } from 'redux';
import loading from 'shared/reducers/loadingBar';
import error from 'shared/reducers/Error';
import helpLink from 'shared/reducers/helpLink';
import cashSummarySheet from 'shared/reducers/cashSummarySheet';
import middlewares from 'shared/api/middlewares';
import { applyDevTools } from 'shared/utils/devToolsHelper';
import getBreadCrumbReducerHandler from 'shared/reducers/breadCrumb';
import reducerHandler from 'shared/utils/reducerHandler';
import reservation from './reducers/reservation';

const middleWare = applyDevTools(applyMiddleware(...middlewares));
const appName = '__cart__';
const initData = window[appName].__initialState__;

const store = middleWare(createStore)(combineReducers({
  reservation,
  loading,
  error,
  helpLink,
  cashSummarySheet,
  breadCrumb: getBreadCrumbReducerHandler(initData),
  initialData: reducerHandler(initData, {})
}));

export default store;
