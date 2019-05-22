
import { ListType, SelectionMode } from 'src/components/List';
import { createOptionPropSpec, createBooleanPropSpec } from '../../App/utils/createPropSpec';

const maxHeight = {
  '150px': '150px',
  '350px': '350px',
  '450px': '450px'
};

const iconList = {
  'icon-list': 'icon-list',
  'icon-gbp': 'icon-gbp',
  'icon-retweet': 'icon-retweet'
};

const initSettings = {
  selectionMode: createOptionPropSpec('selectionMode', 'Selection Mode', SelectionMode.SINGLE, SelectionMode),
  listType: createOptionPropSpec('listType', 'Column Type', ListType.SINGLE, ListType),
  disabled: createBooleanPropSpec('disabled', 'Disabled', false),
  showTips: createBooleanPropSpec('showTips', 'Show Tips', true),
  showIcon: createBooleanPropSpec('showIcon', 'Show Icon', false),
  checkable: createBooleanPropSpec('checkable', 'Checkable', false),
  showCheckAll: createBooleanPropSpec('showCheckAll', 'Show Check All', false),
  sortable: createBooleanPropSpec('sortable', 'Sortable', false),
  filterable: createBooleanPropSpec('filterable', 'Filterable', false),
  isFuzzy: createBooleanPropSpec('isFuzzy', 'IsFuzzy', false),
  asyncable: createBooleanPropSpec('asyncable', 'Asyncable', false),
  isCustomChange: createBooleanPropSpec('isCustomChange', 'Custom Change', true),
  isCustomRender: createBooleanPropSpec('isCustomRender', 'Custom Render', false),
  WCAG: createBooleanPropSpec('WCAG', 'WCAG', false),
  allowDeselect: createBooleanPropSpec('allowDeselect', 'Allow Deselect', false),
  icon: createOptionPropSpec('icon', 'Icon', iconList['icon-list'], iconList),
  maxHeight: createOptionPropSpec('maxHeight', 'Max Height', maxHeight['150px'], maxHeight)
};

export default initSettings;
