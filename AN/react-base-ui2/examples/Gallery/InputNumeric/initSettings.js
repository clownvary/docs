

import { NUM_MIN, NUM_MAX } from 'src/components/InputNumeric';
import { createTextPropSpec, createBooleanPropSpec, createOptionPropSpec } from '../../App/utils/createPropSpec';

const minOptions = [
  {
    value: NUM_MIN,
    text: `${NUM_MIN}`
  },
  {
    value: -50,
    text: '-50'
  },
  {
    value: -10,
    text: '-10'
  }, {
    value: 0,
    text: '0'
  },

  {
    value: 10,
    text: '10'
  }];

const maxOptions = [
  {
    value: 20,
    text: '20'
  }, {
    value: 50,
    text: '50'
  },
  {
    value: 100,
    text: '100'
  },
  {
    value: NUM_MAX,
    text: `${NUM_MAX}`
  }];

const decimalOptions = [
  {
    value: 0,
    text: '0'
  },
  {
    value: 1,
    text: '1'
  },
  {
    value: 2,
    text: '2'
  }, {
    value: 3,
    text: '3'
  }];

const incOptions = [
  {
    value: 1,
    text: '1'
  },
  {
    value: 2,
    text: '2'
  },
  {
    value: 5,
    text: '5'
  }, {
    value: 10,
    text: '10'
  }];

const initSettings = {
  showTrigger: createBooleanPropSpec('showTrigger', 'Show Trigger', true),
  showSpinner: createBooleanPropSpec('showSpinner', 'Show Spinner', true),
  showGroup: createBooleanPropSpec('showGroup', 'Show Group', false),
  disabled: createBooleanPropSpec('disabled', 'Disabled', false),
  readonly: createBooleanPropSpec('readonly', 'Readonly', false),
  allowKeySpin: createBooleanPropSpec('allowKeySpin', 'Key Inc/Dec', true),
  allowMouseSpin: createBooleanPropSpec('allowMouseSpin', 'Mouse Inc/Dec', false),
  placeHolder: createTextPropSpec('placeHolder', 'Place Holder', 'Type here...'),
  min: createOptionPropSpec('min', 'Min', NUM_MIN, minOptions, true),
  max: createOptionPropSpec('max', 'Max', NUM_MAX, maxOptions, true),
  decimals: createOptionPropSpec('decimals', 'Decimals', 2, decimalOptions, true),
  increment: createOptionPropSpec('increment', 'Increment Step', 1, incOptions, true)
};

export default initSettings;
