
import map from 'lodash/map';
import { Globalize } from 'src/services/i18n';
import { createOptionPropSpec } from '../../App/utils/createPropSpec';


const localeOptions = [
  { text: 'English', value: 'en' },
  { text: 'French', value: 'fr' },
  { text: 'Chinese', value: 'zh' }
];

const timeZoneOptions = map(Array(17), (v, i) => {
  const offset = i - 8;
  return {
    text: `${offset}`,
    value: offset
  };
});

const currencySymbolOptions = [
  { text: '$', value: '$' },
  { text: 'USD', value: 'USD' },
  { text: '($)', value: '($)' }
];

Globalize.ANTimeZoneOffset = 8;

const initSettings = {
  locale: createOptionPropSpec('locale', 'Locale', 'en', localeOptions),
  timeZone: createOptionPropSpec('timeZone', 'Timezone', Globalize.ANTimeZoneOffset, timeZoneOptions, true),
  customSymbol: createOptionPropSpec('customSymbol', 'Custom Symbol', '$', currencySymbolOptions)
};

export default initSettings;
