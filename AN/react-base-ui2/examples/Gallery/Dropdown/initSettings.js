import {
  createTextPropSpec,
  createBooleanPropSpec
} from '../../App/utils/createPropSpec';

const initSettings = {
  placeholder: createTextPropSpec('placeholder', 'Place Holder', 'Select the following options...'),
  filterPlaceholder: createTextPropSpec('filterPlaceholder', 'Filter Place Holder', 'Enter keywords to search...'),
  disabled: createBooleanPropSpec('disabled', 'Disabled', false),
  filter: createBooleanPropSpec('filter', 'Show Filter', false),
  showTextTip: createBooleanPropSpec('showTextTip', 'Show Tooltip', true),
  showAll: createBooleanPropSpec('showAll', 'Hide Clear Button', true),
  showCheckbox: createBooleanPropSpec('showCheckbox', 'Show Checkbox', true),
  showAllCheckbox: createBooleanPropSpec('showAllCheckbox', 'Show Check-all', true),
  showSpiner: createBooleanPropSpec('showSpiner', 'Show Spinner', false),
  autoOpen: createBooleanPropSpec('autoOpen', 'Auto Open', false),
  flexibleMenu: createBooleanPropSpec('flexibleMenu', 'Flexible menu width', false)
};

export default initSettings;
