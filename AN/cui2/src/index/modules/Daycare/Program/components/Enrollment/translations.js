import { defineMessages } from 'react-intl';

const PREFIX = 'app.modules.daycare.Program.Enrollment';

export default defineMessages({
  enrollNow: {
    id: `${PREFIX}.enrollNow`,
    defaultMessage: 'Enroll Now'
  },
  noVacancy: {
    id: `${PREFIX}.noVacancy`,
    defaultMessage: 'No Vacancy'
  },
  free: {
    id: `${PREFIX}.free`,
    defaultMessage: 'Free'
  },
  startingAt: {
    id: `${PREFIX}.startingAt`,
    defaultMessage: 'Starting at'
  },
  perSession: {
    id: `${PREFIX}.perSession`,
    defaultMessage: '/ session'
  }
});
