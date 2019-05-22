import { combineReducers } from 'redux';

import Program from '../Program/reducers/';
import EnrollForm from '../EnrollForm/reducers';

export default combineReducers({
  Program,
  EnrollForm
});
