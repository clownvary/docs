
import { createBooleanPropSpec } from '../../App/utils/createPropSpec';

const initSettings = {
  multiple: createBooleanPropSpec('multiple', 'multiple', false),
  isPanelHeaderFocusable: createBooleanPropSpec('isPanelHeaderFocusable', 'Can focus the panel header', true)
};

export default initSettings;
