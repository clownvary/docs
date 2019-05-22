

import moment from 'moment';
import map from 'lodash/map';
import { createTextPropSpec, createBooleanPropSpec, createOptionPropSpec } from '../../App/utils/createPropSpec';

const minOptions = map(Array(12), (item, index) => {
  const m = moment().add((index + 3) * -1, 'day');
  return {
    value: m,
    text: m.format('MMM DD, YYYY')
  };
});

const maxOptions = map(Array(12), (item, index) => {
  const m = moment().add((index + 3), 'day');
  return {
    value: m,
    text: m.format('MMM DD, YYYY')
  };
});

const initSettings = {
  customFormat: createTextPropSpec('customFormat', 'Custom Format', 'MM/DD YYYY'),
  showTrigger: createBooleanPropSpec('showTrigger', 'Show Trigger', true),
  allowBlank: createBooleanPropSpec('allowBlank', 'Allow Blank', true),
  flexibleCalendar: createBooleanPropSpec('flexibleCalendar', 'Flexible Popup Calendar', false),
  min: createOptionPropSpec('min', 'Min Date', null, minOptions),
  max: createOptionPropSpec('max', 'Max Date', null, maxOptions)
};

export default initSettings;
