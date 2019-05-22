import { defineMessages } from 'react-intl';

const PREFIX = 'app.shared.components.SessionCardGroup';

export default defineMessages({
  sorry: {
    id: `${PREFIX}.sorry`,
    defaultMessage: 'We\'re sorry.'
  },
  noSession: {
    id: `${PREFIX}.noSession`,
    defaultMessage: 'No sessions are available for online registration.'
  },
});
