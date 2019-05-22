import { createStore, applyMiddleware, combineReducers } from 'redux';

import loading from 'shared/reducers/loadingBar';
import error from 'shared/reducers/Error';
import middlewares from 'shared/api/middlewares';
import waiver from 'shared/reducers/waiver';
import notes from 'shared/reducers/notes';
import facility from 'shared/reducers/permitFee';
import skylogix from 'shared/reducers/skylogix';
import helpLink from 'shared/reducers/helpLink';
import { applyDevTools } from 'shared/utils/devToolsHelper';
import getBreadCrumbReducerHandler from 'shared/reducers/breadCrumb';
import specialHandling from 'shared/reducers/specialHandling';
import pagination from 'shared/reducers/pagination';
import reducerHandler from 'shared/utils/reducerHandler';
import { setEntryPageIndex } from 'shared/utils/globalStateHelper';
import main from './reducers/index';
import getActionBarReducer from './reducers/actionBar';
import getEventListReducer from './reducers/eventList';
import footer from './reducers/footer';
import getFeeSummaryReducer from './reducers/feeSummary';
import balanceDueDetail from './reducers/balanceDueDetail';
import survey from './reducers/survey';
import attachments from './reducers/attachment';
import getAmendmentReasonReducer from './reducers/modals/amendmentReason';
import getPermitHolderReducer from './reducers/permitHolder';

const middleWare = applyDevTools(applyMiddleware(...middlewares));
const appName = '__reservationDetail__';
const initData = window[appName].__initialState__;
setEntryPageIndex();

const store = middleWare(createStore)(combineReducers({
  main,
  loading,
  error,
  actionBar: getActionBarReducer(initData),
  balanceDueDetail,
  survey,
  eventDetail: getEventListReducer(initData),
  waiver,
  notes,
  facility,
  feeSummary: getFeeSummaryReducer(initData),
  footer,
  skylogix,
  specialHandling,
  helpLink,
  attachments,
  breadCrumb: getBreadCrumbReducerHandler(initData),
  amendmentReason: getAmendmentReasonReducer(initData),
  permitHolder: getPermitHolderReducer(initData),
  initialData: reducerHandler(initData, {}),
  pagination
}));

export default store;
