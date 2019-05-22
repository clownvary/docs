import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { fromJS } from 'immutable';
import master from 'index/components/Master/reducers';
import modules from 'index/modules/reducers';
import dev from 'index/dev-admin/reducers';
import intl from './intl';

const rootReducer = combineReducers({
  routing: routerReducer,
  currentSite: (state = '') => state,
  systemSettings: (state = {}) => fromJS(state),
  configurations: (state = {}) => fromJS(state),
  intl,
  dev,
  master,
  modules
});

export default rootReducer;
