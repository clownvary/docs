import { ButtonType, ButtonSize } from 'src/components/Button';
import { createOptionPropSpec, createBooleanPropSpec } from '../../App/utils/createPropSpec';

const initSettings = {
  size: createOptionPropSpec('size', 'Size', ButtonSize.MEDIUM, ButtonSize),
  type: createOptionPropSpec('type', 'Type', ButtonType.PRIMARY, ButtonType),
  loading: createBooleanPropSpec('loading', 'Loading', false)
};

export default initSettings;
