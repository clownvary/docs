import * as programInfo from './programInfo';
import * as sessions from './sessions';
import * as enrollNow from './enrollNow';
import * as feeSummary from './feeSummary';

export default {
  ...programInfo,
  ...sessions,
  ...enrollNow,
  ...feeSummary
};
