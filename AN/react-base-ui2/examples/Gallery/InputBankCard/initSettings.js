import { createOptionPropSpec, createTextPropSpec, createBooleanPropSpec } from '../../App/utils/createPropSpec';

const maxLengthOptions = [
  { text: '13', value: 13 },
  { text: '14', value: 14 },
  { text: '15', value: 15 },
  { text: '16', value: 16 },
  { text: '17', value: 17 },
  { text: '18', value: 18 },
  { text: '19', value: 19 }
];

const groupOptions = [
  { text: '1', value: 1 },
  { text: '2', value: 2 },
  { text: '3', value: 3 },
  { text: '4', value: 4 },
  { text: '5', value: 5 }
];

const initSettings = {
  maxLength: createOptionPropSpec('maxLength', 'Max Length', 16, maxLengthOptions, true),
  group: createOptionPropSpec('group', 'Group', 4, groupOptions, true),
  gapChar: createTextPropSpec('gapChar', 'Gap Character', ' - '),
  showPrompt: createBooleanPropSpec('showPrompt', 'Show prompt character', true),
  keepPosition: createBooleanPropSpec('keepPosition', 'Keep character positions', true)
};

export default initSettings;
