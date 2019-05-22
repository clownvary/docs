import { defineMessages } from 'react-intl';

const PREFIX = 'app.dev.configuration';

export default defineMessages({
  successfulTitle: {
    id: `${PREFIX}.successfulTitle`,
    defaultMessage: 'Configuration of site'
  },
  cuiVersionTitle: {
    id: `${PREFIX}.cuiVersionTitle`,
    defaultMessage: 'New CUI Version: {version}'
  },
  auiVersionTitle: {
    id: `${PREFIX}.auiVersionTitle`,
    defaultMessage: 'AUI Version: {version}'
  },
  failedTitle: {
    id: `${PREFIX}.failedTitle`,
    defaultMessage: 'Load Configuration Failed'
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
