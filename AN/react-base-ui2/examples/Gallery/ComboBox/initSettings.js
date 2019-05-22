import {
  createOptionPropSpec,
  createBooleanPropSpec,
  createNumberPropSpec,
  createTextPropSpec
} from '../../App/utils/createPropSpec';

const textAligns = [
  { text: 'left', value: 'left' },
  { text: 'right', value: 'right' }
];

const initSettings = {
  disabled: createBooleanPropSpec('disabled', 'Disabled', false),
  showTrigger: createBooleanPropSpec('showTrigger', 'Show Trigger', true),
  placeHolder: createTextPropSpec('placeHolder', 'Place Holder', 'please input text'),
  triggerIcon: createTextPropSpec('triggerIcon', 'Trigger Icon', 'icon-chevron-down'),
  maxLength: createNumberPropSpec('maxLength', 'Max Length', 10),
  textAlign: createOptionPropSpec('textAlign', 'Text Align', 'left', textAligns),
  ariaLabel: createTextPropSpec('ariaLabel', 'Aria Label', 'combo sample wcag'),
  triggerIconHint: createTextPropSpec('triggerIconHint', 'Trigger Icon Hint', 'combo trigger icon wcag')
};

export default initSettings;
