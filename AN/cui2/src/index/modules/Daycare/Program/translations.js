import { defineMessages } from 'react-intl';

const PREFIX = 'app.modules.daycare.Program';

export default defineMessages({
  activitySearch: {
    id: `${PREFIX}.activitySearch`,
    defaultMessage: '{activityLabel} Search'
  },
  program: {
    id: `${PREFIX}.program`,
    defaultMessage: '{daycareLabel} Program Detail'
  },
  description: {
    id: `${PREFIX}.description`,
    defaultMessage: 'Description'
  }
});
