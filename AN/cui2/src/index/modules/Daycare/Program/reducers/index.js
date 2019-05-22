import { combineReducers } from 'redux';

import programInfo from './programInfo';
import sessions from './sessions';
import feeSummary from './feeSummary';

export default combineReducers({
  programInfo,
  sessions,
  feeSummary
});
