import { createStore, applyMiddleware, combineReducers } from 'redux';
import loading from 'shared/reducers/loadingBar';
import error from 'shared/reducers/Error';
import prerequisite from 'shared/reducers/prerequisite';
import helpLink from 'shared/reducers/helpLink';
import middlewares from 'shared/api/middlewares';
import { applyDevTools } from 'shared/utils/devToolsHelper';
import getBreadCrumbReducerHandler from 'shared/reducers/breadCrumb';
import reducerHandler from 'shared/utils/reducerHandler';
import getRefundDepositsReducer from './reducers/refundDeposits';

const middleWare = applyDevTools(applyMiddleware(...middlewares));
const appName = '__refund__';
const initData = window[appName].__initialState__;

const store = middleWare(createStore)(combineReducers({
  refundDeposits: getRefundDepositsReducer(initData),
  loading,
  error,
  prerequisite,
  helpLink,
  breadCrumb: getBreadCrumbReducerHandler(initData),
  initialData: reducerHandler(initData, {})
}));

export default store;
