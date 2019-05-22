import { combineReducers } from 'redux';

import receipt from './receipt';
import participants from './participants';
import enrollSession from './enrollSession';
import collapse from './collapse';
import feeSummary from './feeSummary';
import enrollDetail from './enrollDetail';
import enrollForm from './enrollForm';
import survey from './survey';

export default combineReducers({
  participants,
  enrollSession,
  collapse,
  receipt,
  feeSummary,
  enrollDetail,
  enrollForm,
  survey
});
