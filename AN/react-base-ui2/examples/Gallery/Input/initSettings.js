import {
  createOptionPropSpec,
  createBooleanPropSpec,
  createTextPropSpec
} from '../../App/utils/createPropSpec';

const size = [
  { text: 'sm', value: 'sm' },
  { text: 'md', value: 'md' },
  { text: 'lg', value: 'lg' }
];

const initSettings = {
  disabled: createBooleanPropSpec('disabled', 'Disabled', false),
  numberOnly: createBooleanPropSpec('numberOnly', 'Number Only', false),
  size: createOptionPropSpec('size', 'Size', 'md', size),
  preText: createTextPropSpec('preText', 'Prefix Text', ''),
  preIcon: createTextPropSpec('preIcon', 'Prefix Icon', ''),
  postText: createTextPropSpec('postText', 'Post Text', ''),
  postIcon: createTextPropSpec('postIcon', 'Post Icon', '')
};

export default initSettings;
