
import Globalize from 'react-base-ui/lib/services/i18n';
import { gaService, tealiumService } from 'shared/services';
import { getDateTimeFormatsById } from 'shared/utils/datetime';
import webfont from './webFont';
import theme from './theme';

const execute = (store) => {
  const {
    configurations,
    systemSettings
  } = store.getState();

  const config = configurations.toJS();
  const settings = systemSettings.toJS();

  webfont.initialize();
  theme.initialize(settings);
  gaService.initialize(config);
  tealiumService.initialize(store);

  const { dateFormat, timeFormat } =
    getDateTimeFormatsById(config.date_format, config.time_format);

  Globalize.ANDateFormat = dateFormat;
  Globalize.ANTimeFormat = timeFormat;
};

export default execute;
