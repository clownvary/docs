
import { createOptionPropSpec } from '../../App/utils/createPropSpec';

const localeOptions = [
  { text: 'English', value: 'en' },
  { text: 'French', value: 'fr' },
  { text: 'Chinese', value: 'zh-cn' }
];

const dateFormats = [
  { text: 'ddd, DD/MMM/YYYY', value: 'ddd, DD/MMM/YYYY' },
  { text: 'dddd, DD/MMM/YYYY', value: 'dddd, DD/MMM/YYYY' },
  { text: 'DD/MMM/YYYY', value: 'DD/MMM/YYYY' },
  { text: 'DD/MMM/YYYY', value: 'DD/MMM/YYYY' },
  { text: 'DD/MMMM/Y', value: 'DD/MMMM/Y' },
  { text: 'D/M/YYYY', value: 'D/M/YYYY' },
  { text: 'DDD MMM YYYY', value: 'DDD MMM YYYY' },
  { text: 'YYYY-MM-DD', value: 'YYYY-MM-DD' }
];

const timeFormats = [
  { text: 'HH:mm:ss', value: 'HH:mm:ss' },
  { text: 'hh:mm:ss a', value: 'hh:mm:ss a' },
  { text: 'hh:mm:ss A', value: 'hh:mm:ss A' }
];

const initSettings = {
  locale: createOptionPropSpec('locale', 'Locale', 'en', localeOptions),
  dateFormat: createOptionPropSpec('dateFormat', 'Date Format', 'DD/MMM/YYYY', dateFormats),
  timeFormat: createOptionPropSpec('timeFormat', 'Time Format', 'HH:mm:ss', timeFormats)
};

export default initSettings;
