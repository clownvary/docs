

import moment from 'moment';
import map from 'lodash/map';
import { createBooleanPropSpec, createTextPropSpec, createOptionPropSpec } from '../../App/utils/createPropSpec';

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
  showTrigger: createBooleanPropSpec('showTrigger', 'Show Trigger', true),
  showTrigger2: createBooleanPropSpec('showTrigger2', 'Show Trigger2', true),
  placeHolder: createTextPropSpec('placeHolder', 'Place Holder', 'Type here...'),
  min: createOptionPropSpec('min', 'Min Date', null, minOptions),
  max: createOptionPropSpec('max', 'Max Date', null, maxOptions)
};

export default initSettings;
