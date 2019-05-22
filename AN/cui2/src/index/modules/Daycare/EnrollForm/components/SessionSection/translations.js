import { defineMessages } from 'react-intl';

const PREFIX = 'app.modules.daycare.EnrollForm.SessionSection';

export default defineMessages({
  sessionEnrolling: {
    id: `${PREFIX}.who`,
    defaultMessage: 'Sessions you are enrolling'
  },
  requiredErrorMessage: {
    id: `${PREFIX}.requiredErrorMessage`,
    defaultMessage: 'Please select at least one session'
  },
  requiredErrorMessageWeekly: {
    id: `${PREFIX}.requiredErrorMessageWeekly`,
    defaultMessage: 'Please select at least one week'
  },
  weeksAndSessionsEnrolling: {
    id: `${PREFIX}.weeksAndSessionsEnrolling`,
    defaultMessage: 'Weeks and sessions you are enrolling'
  },
  selectedSummarySingular: {
    id: `${PREFIX}.selectedSummarySingular`,
    defaultMessage: 'Selected Summary ({count} Week)'
  },
  selectedSummaryPlural: {
    id: `${PREFIX}.selectedSummaryPlural`,
    defaultMessage: 'Selected Summary ({count} Weeks)'
  },

  enrolledAllSessionsMessage: {
    id: `${PREFIX}.enrolledAllSessionsMessage`,
    defaultMessage: 'You have already enrolled into all sessions.'
  },

  mustBeSelectedMessage: {
    id: `${PREFIX}.mustBeSelectedMessage`,
    defaultMessage: 'All the following sessions must be selected.'
  },

  waitingAllSessionsMessage: {
    id: `${PREFIX}.waitingAllSessionsMessage`,
    defaultMessage: 'You are already on waiting list for all sessions.'
  },

  disabledEnrolledMessage: {
    id: `${PREFIX}.disabledEnrolledMessage`,
    defaultMessage: 'Sessions are disabled because you already enrolled.'
  },

  disabledWaitingMessage: {
    id: `${PREFIX}.disabledWaitingMessage`,
    defaultMessage: 'Sessions are disabled because you are on waiting list.'
  },

  disabledReasonMessage: {
    id: `${PREFIX}.disabledReasonMessage`,
    defaultMessage: 'Sessions are disabled because you already enrolled, waitlisted or the session is full.'
  },

  allFullMessage: {
    id: `${PREFIX}.allFullMessage`,
    defaultMessage: 'All sessions are full.'
  },

  disabledFullMessage: {
    id: `${PREFIX}.disabledFullMessage`,
    defaultMessage: 'Sessions are disabled because they are full.'
  },

  allMustBeSelectedMessage: {
    id: `${PREFIX}.allMustBeSelectedMessage`,
    defaultMessage: 'All the following sessions must be selected. All sessions are full. You\'ll be added to waiting list of the program.'
  },
  scheduleConflictMessage: {
    id: `${PREFIX}.scheduleConflictMessage`,
    defaultMessage: 'Schedule conflict: you are already enrolled in another program/activity in this time slot.'
  }
});
