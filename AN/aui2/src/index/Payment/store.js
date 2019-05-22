import { createStore, applyMiddleware, combineReducers } from 'redux';
import loading from 'shared/reducers/loadingBar';
import error from 'shared/reducers/Error';
import helpLink from 'shared/reducers/helpLink';
import middlewares from 'shared/api/middlewares';
import { applyDevTools } from 'shared/utils/devToolsHelper';
import getBreadCrumbReducerHandler from 'shared/reducers/breadCrumb';
import reducerHandler from 'shared/utils/reducerHandler';

import getPaymentReducer from './reducers';
import getPayerReducer from './reducers/payer';
import getPaymentOptionsReducer from './reducers/paymentOptions';
import getPaymentSummaryReducer from './reducers/paymentSummary';
import getPaymentActionReducer from './reducers/paymentAction';

import getNewCreditCardReducer from './reducers/modals/newCreditCard';
import newECheck from './reducers/modals/newECheck';
import magtek from './reducers/modals/Magtek';
import getPinpadReducer from './components/Modals/PinPad/reducers/pinpadModal';

const middleWare = applyDevTools(applyMiddleware(...middlewares));
const appName = '__payment__';
const initData = window[appName].__initialState__;

const store = middleWare(createStore)(combineReducers({
  payment: getPaymentReducer(initData),
  payer: getPayerReducer(initData),
  paymentOptions: combineReducers(getPaymentOptionsReducer(initData)),
  paymentModals: combineReducers({
    pinpad: getPinpadReducer(initData),
    newCreditCard: getNewCreditCardReducer(initData),
    newECheck,
    magtek
  }),
  paymentSummary: getPaymentSummaryReducer(initData),
  paymentAction: getPaymentActionReducer(initData),

  loading,
  error,
  helpLink,
  breadCrumb: getBreadCrumbReducerHandler(initData),
  initialData: reducerHandler(initData, {})
}));

export default store;
