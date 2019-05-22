import { defineMessages } from 'react-intl';

const PREFIX = 'app.modules.daycare.EnrollForm';

export default defineMessages({
  activitySearch: {
    id: `${PREFIX}.activitySearch`,
    defaultMessage: '{activityLabel} Search'
  },
  program: {
    id: `${PREFIX}.program`,
    defaultMessage: '{daycareLabel} Program Detail'
  },
  enrollForm: {
    id: `${PREFIX}.enrollForm`,
    defaultMessage: 'Enroll Program Form'
  },
  enrollIn: {
    id: `${PREFIX}.enrollIn`,
    defaultMessage: 'Enroll in'
  },
  programChangedAlertMsg: {
    id: `${PREFIX}.programChangedAlertMsg`,
    defaultMessage: 'This session has been fully enrolled just now. Please try to enroll in another session.'
  },
  programFullyAlertMsg: {
    id: `${PREFIX}.programFullyAlertMsg`,
    defaultMessage: 'Sorry. This program has been fully enrolled just now. Please try to enroll in another program.'
  },
  Note: {
    id: `${PREFIX}.Note`,
    defaultMessage: 'Note'
  },
  beforeunlodadPrompt: {
    id: `${PREFIX}.beforeunlodadPrompt`,
    defaultMessage: 'If you continue, your pending transaction will be cancelled. Are you sure you want to leave this page?'
  },
  Notes: {
    id: `${PREFIX}.Notes`,
    defaultMessage: 'Notes'
  },
  reSelectParticipant: {
    id: `${PREFIX}.reSelectParticipant`,
    defaultMessage: 'An error occurred. Please re-select the participant under the current tab before proceeding.'
  }
});
