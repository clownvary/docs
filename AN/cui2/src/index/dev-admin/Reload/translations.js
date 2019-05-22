import { defineMessages } from 'react-intl';

const PREFIX = 'app.dev.reload';

export default defineMessages({
  successfulTitle: {
    id: `${PREFIX}.successfulTitle`,
    defaultMessage: 'Reload Sites Successful'
  },
  failedTitle: {
    id: `${PREFIX}.failedTitle`,
    defaultMessage: 'Reload Sites Failed'
  }
});
