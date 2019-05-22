import * as participants from './participants';
import * as enrollSession from './enrollSession';
import * as collapse from './collapse';
import * as feeSummary from './feeSummary';
import * as enrollDetail from './enrollDetail';
import * as survey from './survey';
import * as enrollForm from './enrollForm';

export default {
  ...participants,
  ...enrollSession,
  ...collapse,
  ...feeSummary,
  ...enrollDetail,
  ...survey,
  ...enrollForm
};
