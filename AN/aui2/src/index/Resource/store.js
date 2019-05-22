import { createStore, applyMiddleware, combineReducers } from 'redux';
import loading from 'shared/reducers/loadingBar';
import error from 'shared/reducers/Error';
import runningCart from 'shared/reducers/runningCart';
import helpLink from 'shared/reducers/helpLink';
import middlewares from 'shared/api/middlewares';
import { applyDevTools } from 'shared/utils/devToolsHelper';
import getBreadCrumbReducerHandler from 'shared/reducers/breadCrumb';
import reducerHandler from 'shared/utils/reducerHandler';
import { initResourceViewState } from 'shared/utils/globalStateHelper';
import getResourceFilterReducer from './reducers/resourceFilter';
import booking from './reducers/booking';
import bookingPanel from './reducers/bookingPanel';
import onboarding from './reducers/onboarding';
import getQuickViewReducer from './reducers/quickView';
import recurringPattern from './reducers/recurringPattern';
import configurationData from './reducers/configurationData';
import getMainReducer from './reducers/main';

const middleWare = applyDevTools(applyMiddleware(...middlewares));
const appName = '__resourceCalender__';
const initData = window[appName].__initialState__;

const {
  bookingType,
  currentDate,
  permitStartEventDate,
  dateFormat
} = initData;
initResourceViewState(bookingType, currentDate, permitStartEventDate, dateFormat);

const store = middleWare(createStore)(combineReducers({
  resourceFilter: getResourceFilterReducer(initData),
  main: getMainReducer(initData),
  configurationData,
  booking,
  bookingPanel,
  onboarding,
  loading,
  error,
  runningCart,
  recurringPattern,
  helpLink,
  quickView: getQuickViewReducer(initData),
  breadCrumb: getBreadCrumbReducerHandler(initData),
  initialData: reducerHandler(initData, {})
}));

export default store;
