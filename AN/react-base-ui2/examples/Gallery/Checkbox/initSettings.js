
import { createOptionPropSpec, createBooleanPropSpec } from '../../App/utils/createPropSpec';

const sizeEnum = {
  small: 'sm',
  default: 'm',
  large: 'lg'
};

const valueEnum = {
  true: 'true',
  false: 'false'
};

const initSettings = {
  size: createOptionPropSpec('size', 'Size', sizeEnum.default, sizeEnum),
  value: createOptionPropSpec('value', 'Checkbox Value', valueEnum.true, valueEnum),
  disabled: createBooleanPropSpec('disabled', 'Disabled', false)
};

export default initSettings;
