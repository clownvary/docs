import {
  createBooleanPropSpec
} from '../../App/utils/createPropSpec';

const initSettings = {
  disabled: createBooleanPropSpec('disabled', 'Disabled', false),
  required: createBooleanPropSpec('required', 'Required', true)
};

export default initSettings;
