import { ButtonType, ButtonSize } from 'src/components/Button';
import { createBooleanPropSpec, createOptionPropSpec } from '../../App/utils/createPropSpec';

const initSettings = {
  disabled: createBooleanPropSpec('disabled', 'Disabled', false),
  size: createOptionPropSpec('size', 'Size', ButtonSize.MEDIUM, ButtonSize),
  type: createOptionPropSpec('type', 'Type', ButtonType.PRIMARY, ButtonType),
  loading: createBooleanPropSpec('loading', 'Loading', false)
};

export default initSettings;
