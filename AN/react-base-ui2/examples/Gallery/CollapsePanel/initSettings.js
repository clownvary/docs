
import { createBooleanPropSpec, createOptionPropSpec } from '../../App/utils/createPropSpec';

const transitions = [
  { text: 'No', value: 'none' },
  { text: 'Dropdown', value: 'height 0.2s linear' },
  { text: 'Dropdown (gentle)', value: 'height 1s ease-out' }
];

const initSettings = {
  expanded: createBooleanPropSpec('expanded', 'Expanded', false),
  showSummary: createBooleanPropSpec('showSummary', 'Show Summary', false),
  transition: createOptionPropSpec('transition', 'Transition', 'none', transitions)
};

export default initSettings;
