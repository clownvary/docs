
import { createTextPropSpec, createBooleanPropSpec, createNumberPropSpec, createOptionPropSpec } from '../../App/utils/createPropSpec';

export const enumBoolean = {
  RANDOM: 2,
  TRUE: 1,
  FALSE: 0
}

export const enumLayout = {
  DEFAULT: undefined,
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical'
}

const initSettings = {
  readonly: createOptionPropSpec('readonly', 'Readonly', enumBoolean.FALSE, enumBoolean),
  required: createOptionPropSpec('required', 'required', enumBoolean.TRUE, enumBoolean),
  isShown: createBooleanPropSpec('isShown', 'isShown', enumBoolean.TRUE, enumBoolean),
  showError: createOptionPropSpec('showError', 'showError', enumBoolean.FALSE, enumBoolean),
  icon: createTextPropSpec('icon', 'icon', 'icon-trash'),
  maxLength: createNumberPropSpec('maxLength', 'Max Length', 100),
  placeHolder: createTextPropSpec('placeHolder', 'Place holder', ''),
  showHint: createBooleanPropSpec('showHint', 'showHint', true),
  layout: createOptionPropSpec('layout', 'Layout', undefined, enumLayout)
};

export default initSettings;
