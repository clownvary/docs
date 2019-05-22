import { defineMessages } from 'react-intl';

const PREFIX = 'app.modules.daycare.EnrollForm.SessionSection.EnrollCalendar';

export default defineMessages({
  selectAll: {
    id: `${PREFIX}.selectAll`,
    defaultMessage: 'Select all'
  },
  removeAll: {
    id: `${PREFIX}.removeAll`,
    defaultMessage: 'Remove all'
  },
  sessionsInMonth: {
    id: `${PREFIX}.sessionsInMonth`,
    defaultMessage: '{count} Session(s) in current month.'
  }
});
