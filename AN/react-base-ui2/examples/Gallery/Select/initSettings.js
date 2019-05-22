import { createTextPropSpec, createBooleanPropSpec } from '../../App/utils/createPropSpec';

const initSettings = {
  resetFilterAfterSelect: createBooleanPropSpec('resetFilterAfterSelect', 'ResetFilterAfterSelect', true),
  placeholder: createTextPropSpec('placeholder', 'Placeholder', 'Please select...'),
  inputValue: createTextPropSpec('inputValue', 'InputValue', ''),
  optionItemRenderer: createBooleanPropSpec('optionItemRenderer', 'CustomizeOptionItemRenderer', true),
  optionFooterRenderer: createBooleanPropSpec('optionFooterRenderer', 'CustomizeOptionFooterRenderer', true)
};

export default initSettings;
