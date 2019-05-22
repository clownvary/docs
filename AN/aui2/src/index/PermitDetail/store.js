import { createStore, applyMiddleware, combineReducers } from 'redux';
import loading from 'shared/reducers/loadingBar';
import error from 'shared/reducers/Error';
import runningCart from 'shared/reducers/runningCart';
import helpLink from 'shared/reducers/helpLink';
import middlewares from 'shared/api/middlewares';
import notes from 'shared/reducers/notes';
import skylogix from 'shared/reducers/skylogix';
import permitFee from 'shared/reducers/permitFee';
import waiver from 'shared/reducers/waiver';
import prerequisite from 'shared/reducers/prerequisite';
import specialHandling from 'shared/reducers/specialHandling';
import { applyDevTools } from 'shared/utils/devToolsHelper';
import getBreadCrumbReducerHandler from 'shared/reducers/breadCrumb';
import reducerHandler from 'shared/utils/reducerHandler';
import pagination from 'shared/reducers/pagination';

import survey from './reducers/survey';
import addToCart from './reducers/addToCart';
import getMainReducer from './reducers/index';
import getPermitSearchReducer from './reducers/permitSearch';
import getPermitTypeReducer from './reducers/permitType';
import stageSequences from './reducers/stageSequences';

const middleWare = applyDevTools(applyMiddleware(...middlewares));
const appName = '__permitDetail__';
const initData = window[appName].__initialState__;

const store = middleWare(createStore)(combineReducers({
  main: getMainReducer(initData),
  permitSearch: getPermitSearchReducer(initData),
  permitType: getPermitTypeReducer(initData),
  stageSequences,
  waiver,
  notes,
  permitFee,
  addToCart,
  loading,
  error,
  runningCart,
  helpLink,
  skylogix,
  prerequisite,
  survey,
  specialHandling,
  breadCrumb: getBreadCrumbReducerHandler(initData),
  initialData: reducerHandler(initData, {}),
  pagination
}));

export default store;
