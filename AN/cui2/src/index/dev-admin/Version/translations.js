import { defineMessages } from 'react-intl';

const PREFIX = 'app.dev.version';

export default defineMessages({
  successfulTitle: {
    id: `${PREFIX}.successfulTitle`,
    defaultMessage: 'Version of site'
  },
  failedTitle: {
    id: `${PREFIX}.failedTitle`,
    defaultMessage: 'Load Version Failed'
  },
  gridTitleNumber: {
    id: `${PREFIX}.gridTitleNumber`,
    defaultMessage: 'Number'
  },
  gridTitleKey: {
    id: `${PREFIX}.gridTitleKey`,
    defaultMessage: 'Key'
  },
  gridTitleValue: {
    id: `${PREFIX}.gridTitleValue`,
    defaultMessage: 'Value'
  }
});
