import {
  showError,
  clearError,
  showWarning,
  clearWarning,
  clearAll
} from 'src/services/message';
import { createActionSpec, createTextPropSpec, createBooleanPropSpec } from '../../App/utils/createPropSpec';
import pickProps from '../../App/utils/pickProps';

const onShowError = (settings) => {
  const props = pickProps(settings, ['customText', 'appendMode', 'noDuplicated', 'dismissable']);
  const { customText, ...rest } = props;
  showError([customText], { ...rest });
};

const onClearError = () => {
  clearError();
};

const onShowWarning = (settings) => {
  const props = pickProps(settings, ['customText', 'appendMode', 'noDuplicated', 'dismissable']);
  const { customText, ...rest } = props;
  showWarning([customText], { ...rest });
};

const onClearWarning = () => {
  clearWarning();
};

const onClearAll = () => {
  clearAll();
};

const initSettings = {
  appendMode: createBooleanPropSpec('appendMode', 'Append Mode', false),
  dismissable: createBooleanPropSpec('dismissable', 'Dismissable', false),
  noDuplicated: createBooleanPropSpec('noDuplicated', 'No Duplicate', true),
  showError: createActionSpec('showError', 'Show Error', onShowError),
  clearError: createActionSpec('clearError', 'Clear Errors', onClearError),
  showWarning: createActionSpec('showWarning', 'Show Warning', onShowWarning),
  clearWarnings: createActionSpec('clearWarnings', 'Clear Warnings', onClearWarning),
  clearAll: createActionSpec('clearAll', 'Clear All', onClearAll),
  customText: createTextPropSpec('customText', 'Custom Text', 'Some message...')
};

export default initSettings;
