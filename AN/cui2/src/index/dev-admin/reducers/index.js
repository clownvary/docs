import { combineReducers } from 'redux';
import reload from '../Reload/reducers';
import configuration from '../Configuration/reducers';
import version from '../Version/reducers';

export default combineReducers({
  reload, configuration, version
});
