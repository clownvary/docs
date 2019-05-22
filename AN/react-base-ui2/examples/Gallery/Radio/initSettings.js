import { createBooleanPropSpec, createOptionPropSpec } from '../../App/utils/createPropSpec';

const radioSizeOptions = [
  { text: 'Small', value: 'sm' },
  { text: 'Medium', value: 'md' },
  { text: 'Large', value: 'lg' }
];

const initSettings = {
  size: createOptionPropSpec('size', 'Size', 'sm', radioSizeOptions),
  disabled: createBooleanPropSpec('disabled', 'Disabled', false)
};

export default initSettings;
